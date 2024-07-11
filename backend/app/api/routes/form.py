import json
import os
import uuid

from fastapi import APIRouter, Request, BackgroundTasks, Depends
from pydantic import BaseModel, ValidationError, Field
from typing import List, Optional
from pydantic_yaml import to_yaml_str
from sqlmodel import Session

from app.core import utils
from app.core.config import settings
from app.core.db import get_session
from app.models import YAMLFile, MarkdownFile, HTMLFile

router = APIRouter()


class InfoDetailSchema(BaseModel):
    icon: str
    data: str


class CertificateSchema(BaseModel):
    year: str
    name: str
    extra: Optional[str] = Field(default=None)


class EducationSchema(BaseModel):
    place: str
    major: str
    time: str
    extra: Optional[str] = Field(default=None)


class PhaseSchema(BaseModel):
    time: str
    position: str
    detail: Optional[str] = Field(default=None)


class ExperienceSchema(BaseModel):
    place: str
    phase: List[PhaseSchema]


class ActivitySchema(BaseModel):
    place: str
    phase: List[PhaseSchema]


class ReferenceSchema(BaseModel):
    # TODO: Add more fields
    value: str


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
    skill: str = Field(
        ...,
        title="Skills",
        description="Skills of the user",
        max_length=500,
        min_length=0,
    )
    certificate: Optional[List[CertificateSchema]] = Field(default=None)
    education: Optional[List[EducationSchema]] = Field(default=None)
    experience: Optional[List[ExperienceSchema]] = Field(default=None)
    activity: Optional[List[ActivitySchema]] = Field(default=None)
    reference: Optional[List[ReferenceSchema]] = Field(default=None)


@router.post("/submit-form/")
async def submit_form(request: Request, background_tasks: BackgroundTasks, session: Session = Depends(get_session)):
    """
    Submit form data
    Args:
        request: Request: Request object
        background_tasks: BackgroundTasks: BackgroundTasks object
        session: Session: Session object
    Returns:

    """
    # json_data = jsonable_encoder(form_data)
    # print(form_data)
    try:
        data = await request.json()
        form_data = FormSchema(**data)
        form_dir = settings.DATA_FOLDER_PATH_YAML
        # Generate uuid for the form
        new_uid = str(uuid.uuid4())
        file_path = os.path.join(form_dir, f"{new_uid}.yaml")
        # Write the yaml file to YAML folder:
        await utils.write_file(file_path, to_yaml_str(form_data))

        # utils.create_markdown_file(new_uid)
        # utils.create_output_file(new_uid)
        background_tasks.add_task(utils.create_markdown_file, new_uid)
        background_tasks.add_task(utils.create_output_file, new_uid)

        yaml_file = YAMLFile(
            title="form.yaml",
            data_path=file_path,
            owner_id=0,
            uid=new_uid,
        )
        md_file = MarkdownFile(
            title="form.md",
            data_path=os.path.join(settings.DATA_FOLDER_PATH_MARKDOWN, f"{new_uid}.md"),
            owner_id=0,
            uid=new_uid
        )
        html_file = HTMLFile(
            title="form.html",
            data_path=os.path.join(settings.DATA_FOLDER_PATH_HTML, f"{new_uid}.html"),
            owner_id=0,
            uid=new_uid
        )
        try:
            session.add(yaml_file)
            session.flush()
            session.refresh(yaml_file)

            session.add(md_file)
            session.flush()
            session.refresh(md_file)

            session.add(html_file)
            session.commit()
            session.refresh(html_file)
        except Exception as e:
            return {"error": str(e)}

        return {"message": "Form submitted successfully", "uid": new_uid}

    except json.JSONDecodeError:
        return {"message": "Invalid JSON format"}
    except ValidationError as e:
        return {"error": "Validation error", "details": e.errors()}
    except Exception as e:
        return {"error": str(e)}
