from fastapi import APIRouter, status, HTTPException, Query, Path, Response
from fastapi.responses import StreamingResponse
from typing import Union, List, Optional
from datetime import datetime
import uuid
import io

from api.src.cv_tritiumd.domains.commands import (
    RetrieveFileCommand,
    RetrieveFileContentCommand,
    StreamFileCommand,
    QueryFileRecordsCommand,
)
from api.src.cv_tritiumd.domains.events import (
    OutputFileDeliveredEvent,
    OutputFileNotFoundEvent,
    FileType as EventFileType,
)

router = APIRouter(prefix="/output", tags=["output"])


@router.get(
    "/{file_uid}",
    response_model=Union[OutputFileDeliveredEvent, OutputFileNotFoundEvent],
    status_code=status.HTTP_200_OK,
    summary="Retrieve output file metadata",
)
async def get_output_file(
    file_uid: str = Path(..., description="Unique identifier for the file"),
    file_type: EventFileType = Query(
        EventFileType.PDF, description="Type of file to retrieve"
    ),
):
    """
    Accepts a file UID, constructs a RetrieveFileCommand,
    dispatches it (stub), and returns an OutputFileDeliveredEvent or OutputFileNotFoundEvent.
    """
    now = datetime.utcnow()
    # Stub: Simulate file found if file_uid is not "notfound"
    if file_uid == "notfound":
        return OutputFileNotFoundEvent(
            event_id=str(uuid.uuid4()),
            timestamp=now,
            request_uid=str(uuid.uuid4()),
            file_uid=file_uid,
            file_type=file_type,
            error_message="File not found",
        )
    return OutputFileDeliveredEvent(
        event_id=str(uuid.uuid4()),
        timestamp=now,
        request_uid=str(uuid.uuid4()),
        file_uid=file_uid,
        file_type=file_type,
        file_size=123456,
        delivery_duration=42,
    )


@router.get(
    "/{file_uid}/content",
    response_class=Response,
    status_code=status.HTTP_200_OK,
    summary="Retrieve output file content",
    responses={
        200: {"content": {"application/octet-stream": {}}},
        404: {"description": "File not found"},
    },
)
async def get_output_file_content(
    file_uid: str = Path(..., description="Unique identifier for the file"),
    file_type: EventFileType = Query(
        EventFileType.PDF, description="Type of file to retrieve"
    ),
):
    """
    Accepts a file UID, constructs a RetrieveFileContentCommand,
    dispatches it (stub), and returns file content (stubbed).
    """
    # Stub: Return dummy content unless file_uid is "notfound"
    if file_uid == "notfound":
        raise HTTPException(status_code=404, detail="File not found")
    dummy_content = b"Stub file content for file_uid: %s" % file_uid.encode()
    return Response(content=dummy_content, media_type="application/octet-stream")


@router.get(
    "/{file_uid}/stream",
    response_class=StreamingResponse,
    status_code=status.HTTP_200_OK,
    summary="Stream output file content",
    responses={
        200: {"content": {"application/octet-stream": {}}},
        404: {"description": "File not found"},
    },
)
async def stream_output_file(
    file_uid: str = Path(..., description="Unique identifier for the file"),
    file_type: EventFileType = Query(
        EventFileType.PDF, description="Type of file to stream"
    ),
):
    """
    Accepts a file UID, constructs a StreamFileCommand,
    dispatches it (stub), and returns streamed file content (stubbed).
    """
    # Stub: Return dummy stream unless file_uid is "notfound"
    if file_uid == "notfound":
        raise HTTPException(status_code=404, detail="File not found")
    dummy_stream = io.BytesIO(
        b"Stub streamed content for file_uid: %s" % file_uid.encode()
    )
    return StreamingResponse(dummy_stream, media_type="application/octet-stream")


@router.get(
    "/records/",
    response_model=List[dict],
    status_code=status.HTTP_200_OK,
    summary="Query output file records",
)
async def query_output_file_records(
    owner_id: Optional[int] = Query(None, description="Owner user ID"),
    file_type: Optional[EventFileType] = Query(None, description="Filter by file type"),
    limit: int = Query(10, ge=1, le=100, description="Max records to return"),
    offset: int = Query(0, ge=0, description="Records offset"),
):
    """
    Accepts query parameters, constructs a QueryFileRecordsCommand,
    dispatches it (stub), and returns a list of file records (stubbed).
    """
    # Stub: Return dummy records
    records = [
        {
            "file_uid": f"file-{i}",
            "file_type": file_type or EventFileType.PDF,
            "owner_id": owner_id or 1,
            "title": f"Sample File {i}",
            "created_at": datetime.utcnow().isoformat(),
        }
        for i in range(offset, offset + limit)
    ]
    return records
