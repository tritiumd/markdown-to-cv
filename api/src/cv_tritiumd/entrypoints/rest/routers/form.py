from fastapi import APIRouter, Body, status, HTTPException
from typing import Union
from datetime import datetime
import uuid

from api.src.cv_tritiumd.domains.commands import (
    ProcessFormDataCommand,
    ValidateFormDataCommand,
    SaveFormDataCommand,
)
from api.src.cv_tritiumd.domains.events import (
    FormDataReceivedEvent,
    FormValidationCompletedEvent,
    FormValidationFailedEvent,
)

router = APIRouter(prefix="/form", tags=["form"])


@router.post(
    "/",
    response_model=Union[FormDataReceivedEvent, FormValidationFailedEvent],
    status_code=status.HTTP_201_CREATED,
    summary="Submit form data",
)
async def submit_form_data(command: ProcessFormDataCommand = Body(...)):
    """
    Accepts form data, constructs a ProcessFormDataCommand,
    dispatches it (stub), and returns a FormDataReceivedEvent or FormValidationFailedEvent.
    """
    now = datetime.utcnow()
    # Stub: Dispatch command (replace with real dispatch logic)
    # For demonstration, always return FormDataReceivedEvent
    event = FormDataReceivedEvent(
        event_id=str(uuid.uuid4()),
        timestamp=now,
        form_uid=getattr(command, "form_uid", "stub-form-uid"),
        form_data=getattr(command, "fields", {}),
        language=getattr(command, "language", "en"),
        validation_status="received",
    )
    return event


@router.post(
    "/validate/",
    response_model=Union[FormValidationCompletedEvent, FormValidationFailedEvent],
    status_code=status.HTTP_200_OK,
    summary="Validate form data",
)
async def validate_form_data(command: ValidateFormDataCommand = Body(...)):
    """
    Accepts form validation data, constructs a ValidateFormDataCommand,
    dispatches it (stub), and returns a FormValidationCompletedEvent or FormValidationFailedEvent.
    """
    now = datetime.utcnow()
    # Stub: Dispatch command (replace with real dispatch logic)
    # For demonstration, always return FormValidationCompletedEvent
    event = FormValidationCompletedEvent(
        event_id=str(uuid.uuid4()),
        timestamp=now,
        form_uid=getattr(command, "form_uid", "stub-form-uid"),
        is_valid=True,
        validation_errors=None,
    )
    return event


@router.post(
    "/{form_uid}/save/",
    response_model=Union[FormValidationCompletedEvent, FormValidationFailedEvent],
    status_code=status.HTTP_200_OK,
    summary="Save validated form data",
)
async def save_form_data(
    form_uid: str,
    command: SaveFormDataCommand = Body(...),
):
    """
    Accepts validated form data, constructs a SaveFormDataCommand,
    dispatches it (stub), and returns a suitable event (success/failure).
    """
    now = datetime.utcnow()
    # Stub: Dispatch command (replace with real dispatch logic)
    # For demonstration, always return FormValidationCompletedEvent
    event = FormValidationCompletedEvent(
        event_id=str(uuid.uuid4()),
        timestamp=now,
        form_uid=form_uid,
        is_valid=True,
        validation_errors=None,
    )
    return event
