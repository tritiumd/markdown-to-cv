import json

from fastapi import APIRouter, Request
from pydantic import BaseModel, ValidationError, Field
from typing import List, AnyStr, Optional

router = APIRouter()


class InfoDetailSchema(BaseModel):
    icon: AnyStr
    value: AnyStr


class CertificateSchema(BaseModel):
    # TODO: Add more fields
    value: AnyStr


class EducationSchema(BaseModel):
    # TODO: Add more fields
    value: AnyStr


class ExperienceSchema(BaseModel):
    # TODO: Add more fields
    value: AnyStr


class ActivitySchema(BaseModel):
    # TODO: Add more fields
    value: AnyStr


class ReferenceSchema(BaseModel):
    # TODO: Add more fields
    value: AnyStr


class FormSchema(BaseModel):
    username: str = Field(
        ...,
        title="Username",
        description="Username of the user",
        max_length=50,
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
    skills: str = Field(
        ...,
        title="Skills",
        description="Skills of the user",
        max_length=500,
        min_length=0,
    )
    certificates: Optional[List[CertificateSchema]]
    education: Optional[List[EducationSchema]]
    experiences: Optional[List[ExperienceSchema]]
    activities: Optional[List[ActivitySchema]]
    references: Optional[List[ReferenceSchema]]


@router.post("/form/submit-form/")
async def submit_form(request: Request):
    """
    Submit form data
    Args:
        request: Request: Request object

    Returns:

    """
    # json_data = jsonable_encoder(form_data)
    # print(form_data)
    try:
        data = await request.json()
        form_data = FormSchema(**data)
        return {"message": "Form submitted successfully"}

    except json.JSONDecodeError:
        return {"message": "Invalid JSON format"}
    except ValidationError as e:
        return {"error": "Validation error", "details": e.errors()}
    except Exception as e:
        return {"error": str(e)}
