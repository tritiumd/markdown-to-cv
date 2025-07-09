from fastapi import APIRouter, UploadFile, File, HTTPException, status, Body
from typing import Union, List
from datetime import datetime
import uuid

from api.src.cv_tritiumd.domains.commands import (
    UploadMarkdownFileCommand,
    ValidateFileCommand,
    DeleteFileCommand,
    FileType as CommandFileType,
)
from api.src.cv_tritiumd.domains.events import (
    MarkdownFileUploadedEvent,
    FileValidationFailedEvent,
    FileStorageSucceededEvent,
    FileStorageFailedEvent,
    FileRecordDeletedEvent,
    FileType as EventsFileType,
)

router = APIRouter(prefix="/upload", tags=["upload"])


@router.post(
    "/",
    response_model=Union[MarkdownFileUploadedEvent, FileValidationFailedEvent],
    status_code=status.HTTP_201_CREATED,
    summary="Upload a markdown file",
)
async def upload_markdown_file(file: UploadFile = File(...)):
    """
    Accepts a file upload, constructs an UploadMarkdownFileCommand,
    dispatches it (stub), and returns a MarkdownFileUploadedEvent or FileValidationFailedEvent.
    """
    # Stub values for required fields
    now = datetime.utcnow()
    command = UploadMarkdownFileCommand(
        command_id=str(uuid.uuid4()),
        timestamp=now,
        filename=file.filename or "unnamed.md",
        file_content=await file.read(),
        content_type=file.content_type or "text/markdown",
        owner_id=1,  # stub owner
    )
    # Stub: Dispatch command (replace with real dispatch logic)
    # For demonstration, always return MarkdownFileUploadedEvent
    event = MarkdownFileUploadedEvent(
        event_id=str(uuid.uuid4()),
        timestamp=now,
        file_uid="stub-uid",
        filename=command.filename,
        file_path=f"/fake/path/{command.filename}",
        file_size=len(command.file_content),
        content_type=command.content_type,
        owner_id=command.owner_id,
    )
    return event


@router.post(
    "/validate/",
    response_model=Union[FileStorageSucceededEvent, FileValidationFailedEvent],
    status_code=status.HTTP_200_OK,
    summary="Validate a file",
)
async def validate_file(command: ValidateFileCommand = Body(...)):
    """
    Accepts file validation data, constructs a ValidateFileCommand,
    dispatches it (stub), and returns a FileStorageSucceededEvent or FileValidationFailedEvent.
    """
    now = datetime.utcnow()
    # Stub: Dispatch command (replace with real dispatch logic)
    # For demonstration, always return FileStorageSucceededEvent
    event = FileStorageSucceededEvent(
        event_id=str(uuid.uuid4()),
        timestamp=now,
        file_uid=command.file_uid,
        file_type=EventsFileType("markdown"),
        file_path=command.file_path,
        database_id=123,  # stub database id
    )
    return event


@router.delete(
    "/{file_uid}/delete/",
    response_model=Union[
        FileRecordDeletedEvent, FileValidationFailedEvent, FileStorageFailedEvent
    ],
    status_code=status.HTTP_200_OK,
    summary="Delete a file by UID",
)
async def delete_file(file_uid: str):
    """
    Accepts a file UID, constructs a DeleteFileCommand,
    dispatches it (stub), and returns a suitable event.
    """
    now = datetime.utcnow()
    command = DeleteFileCommand(
        command_id=str(uuid.uuid4()),
        timestamp=now,
        file_uid=file_uid,
        file_type=CommandFileType.MARKDOWN,  # stub type
    )
    # Stub: Dispatch command (replace with real dispatch logic)
    # For demonstration, always return FileRecordDeletedEvent
    event = FileRecordDeletedEvent(
        event_id=str(uuid.uuid4()),
        timestamp=now,
        file_uid=file_uid,
        database_id=123,  # stub database id
        file_type=EventsFileType("markdown"),
        deletion_reason="user_request",
    )
    return event
