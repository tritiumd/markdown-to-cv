import os
import uuid

from fastapi import APIRouter, File, UploadFile, Depends, HTTPException, BackgroundTasks
from sqlmodel import Session

from app.core import utils
from app.core.config import settings
from app.core.db import get_session
from app.models import MarkdownFile, HTMLFile
import logging

logger = logging.getLogger(__name__)
router = APIRouter()


def validate_file(file: UploadFile):
    if not file.filename.lower().endswith(".md") or file.content_type != "text/markdown":
        raise HTTPException(status_code=406, detail="File must be markdown file")


@router.post("/upload-md/")
async def upload_md_file(file: UploadFile = File(...),
                         session: Session = Depends(get_session)
                         ):
    validate_file(file)

    # TODO: change all logic to services
    new_uid = str(uuid.uuid4())
    md_file_path = os.path.join(settings.DATA_FOLDER_PATH_MARKDOWN, f"{new_uid}.md")
    # with open(file_path, "wb") as f:
    #     f.write(await uploaded_file.read())
    file_content = await file.read()
    await utils.write_file(md_file_path, file_content)
    utils.create_output_file(new_uid)

    output_dir = settings.DATA_FOLDER_PATH_HTML
    html_file_path = os.path.join(output_dir, new_uid + ".html")
    logger.debug("file_path: %s", md_file_path)
    md_file = MarkdownFile(
        title=file.filename,
        data_path=md_file_path,
        owner_id=0,
        uid=new_uid
    )
    html_file = HTMLFile(
        title=file.filename + ".html",
        data_path=html_file_path,
        owner_id=0,
        uid=new_uid,
    )
    try:
        session.add(md_file)
        session.flush()
        session.refresh(md_file)

        session.add(html_file)
        session.commit()
        session.refresh(html_file)

        data = {"filename": file.filename, "uid": new_uid}
        # return HTTPResponse(content=data, status_code=200)
        return data
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=404, detail=str(e))
