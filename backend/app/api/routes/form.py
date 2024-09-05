import json
import os
import uuid
from fastapi import APIRouter, Depends, Form, status, Request
from pydantic import BaseModel, ValidationError, Field, BeforeValidator
from typing import List, Optional, Union, Annotated
from pydantic_yaml import to_yaml_str
from sqlmodel import Session

from app.core import utils
from app.core.config import settings
from app.core.db import get_session
from app.models import YAMLFile, MarkdownFile, HTMLFile
import logging
from fastapi.exceptions import HTTPException
import re

router = APIRouter()
logger = logging.getLogger(__name__)


DetailType = Union[str, List[str]]


def validate_detail(v: str) -> List[str]:
    if v == "":
        return []
    # Remove unwanted characters like \n, multiple spaces, etc.
    v = v.strip()
    result = v.split("\n")
    result = [re.sub(r"^[\-\+\s]+", "", item) for item in result]
    return result


class InfoDetailSchema(BaseModel):
    icon: str
    data: str


class CertificateSchema(BaseModel):
    year: str
    name: str
    extra: Annotated[DetailType, BeforeValidator(validate_detail)]


class EducationSchema(BaseModel):
    place: str
    major: str
    time: str
    extra: Annotated[DetailType, BeforeValidator(validate_detail)]


class PhaseSchema(BaseModel):
    time: str
    position: str
    detail: Annotated[DetailType, BeforeValidator(validate_detail)]


class ExperienceSchema(BaseModel):
    place: str
    phase: List[PhaseSchema]


class ProjectSchema(BaseModel):
    place: str
    phase: List[PhaseSchema]


class ActivitySchema(BaseModel):
    place: str
    phase: List[PhaseSchema]


class ReferenceSchema(BaseModel):
    name: str
    position: str
    phone: str
    email: str


class FormSchema(BaseModel):
    name: str = Field(
        ...,
        title="Your name",
        description="Your name",
        max_length=100,
        min_length=0,
    )
    position: str = Field(
        ...,
        title="Position",
        description="Position of the user",
        max_length=50,
        min_length=0,
    )
    info: List[InfoDetailSchema]
    summary: str = Field(
        ...,
        title="Summary",
        description="Summary of the user",
        max_length=500,
        min_length=0,
    )
    skill: Annotated[DetailType, BeforeValidator(validate_detail)]
    certificate: Optional[List[CertificateSchema]] = Field(default=None)
    education: Optional[List[EducationSchema]] = Field(default=None)
    experience: Optional[List[ExperienceSchema]] = Field(default=None)
    project: Optional[List[ProjectSchema]] = Field(default=None)
    activity: Optional[List[ActivitySchema]] = Field(default=None)
    reference: Optional[List[ReferenceSchema]] = Field(default=None)


@router.post("/submit-form/")
async def submit_form(
    request: Request,
    language: str = "vi",
    session: Session = Depends(get_session),
):
    """
    Submit form data
    Args:
        request: Request: Request object
        language: str: Language for CV
        session: Session: Session object
    Returns:

    """
    # json_data = jsonable_encoder(form_data)
    try:
        data = await request.json()
        # logger.debug(data)
        form_data = FormSchema(**data)
        form_dir = settings.DATA_FOLDER_PATH_YAML
        # Generate uuid for the form
        new_uid = str(uuid.uuid4())
        file_path = os.path.join(form_dir, f"{new_uid}.yaml")
        logger.debug("file_path: %s", file_path)
        # Write the yaml file to YAML folder:
        await utils.write_file(file_path, to_yaml_str(form_data))
        logging.debug(to_yaml_str(form_data))

        task_id = utils.yaml_to_html(new_uid, language)
        logging.info("file_path: %s", file_path)
        yaml_file = YAMLFile(
            title="form.yaml",
            data_path=file_path,
            owner_id=0,
            uid=new_uid,
            time_stamp=utils.get_current_time(),
        )
        try:
            session.add(yaml_file)
            session.flush()
            session.refresh(yaml_file)

        except Exception as e:
            return {"error": str(e)}

        return {"message": "Form submitted successfully", "uid": task_id}

    except json.JSONDecodeError:
        logger.error("Invalid JSON format")
        return {"message": "Invalid JSON format"}
    except ValidationError as e:
        logger.error("Validation error", e.errors())
        return {"error": "Validation error", "details": e.errors()}
    except Exception as e:
        logger.error("Error: %s", e)
        return {"error": str(e)}
