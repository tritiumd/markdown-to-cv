import os
import shutil
import uuid
from typing import Any

from fastapi import APIRouter, File, UploadFile, Depends, HTTPException
from sqlmodel import Session, select

from app.core.config import settings
from app.core.db import get_session
from app.models import MarkdownFile, HTMLFile

router = APIRouter()


@router.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...), session: Session = Depends(get_session)):
    # TODO: change all logic to services
    uploaded_file = file
    print(file)
    upload_dir = settings.DATA_FOLDER_PATH
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)
    new_uid = str(uuid.uuid4())
    file_path = os.path.join(upload_dir, new_uid)
    with open(file_path, "wb") as f:
        f.write(await uploaded_file.read())

    file_instance = MarkdownFile(
        title=file.filename,
        data_path=file_path,
        owner_id=0
    )
    output_dir = settings.DATA_OUTPUT_FOLDER_PATH
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    # Create output file
    # TODO: Change logic later.
    output_file_path = os.path.join(output_dir, new_uid + ".html")
    #  Copy file from parent folder of output_dir to this
    parent_dir = os.path.dirname(output_dir)
    file_to_copy = os.path.join(parent_dir, "test.html")
    shutil.copyfile(file_to_copy, output_file_path)

    try:
        session.add(file_instance)
        session.flush()
        session.refresh(file_instance)
        file_output = HTMLFile(
            title=file.filename + ".html",
            data_path=output_file_path,
            owner_id=0,
            input_id=file_instance.id,
        )
        session.add(file_output)
        session.commit()
        session.refresh(file_output)

        data = {"filename": file.filename, "id": file_instance.id}
        # return HTTPResponse(content=data, status_code=200)
        return data
    except Exception:
        session.rollback()
        raise HTTPException(status_code=404, detail="Cannot upload file")


@router.get("/outputfile")
async def get_output_file(file_id: int, session: Session = Depends(get_session)) -> Any:
    query = select(HTMLFile).where(HTMLFile.input_id == file_id)
    output_file = session.exec(query).one()
    filename = output_file.data_path.split("/")
    # Escape the HTML content
    print("filename", filename[-1])
    return {"filename": filename[-1]}

    # query = session.get(HTMLFile, )
