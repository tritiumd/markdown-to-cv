import os
import uuid
from fastapi import APIRouter, File, UploadFile, Depends
from sqlmodel import Session

from app.core.config import settings
from app.core.db import get_session
from app.models import MarkdownFile

router = APIRouter()


@router.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...), session: Session = Depends(get_session)):
    uploaded_file = file
    upload_dir = settings.DATA_FOLDER_PATH
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)

    file_path = os.path.join(upload_dir, str(uuid.uuid4()))
    with open(file_path, "wb") as f:
        f.write(await uploaded_file.read())

    file_instance = MarkdownFile(
        title=file.filename,
        data_path=file_path,
        owner_id=0
    )
    try:
        session.add(file_instance)
        session.commit()
        session.refresh(file_instance)
        return {"filename": file.filename, "id": file_instance.id}
    except Exception:
        session.rollback()
        return "Failed to save the file", 500
