import os
import uuid
from typing import Any

from fastapi import APIRouter, File, UploadFile, Depends, HTTPException
from sqlmodel import Session, select
from starlette.responses import HTMLResponse

from app.core.config import settings
from app.core.db import get_session
from app.models import MarkdownFile, HTMLFile

router = APIRouter()


def create_output_file(upload_dir: str, output_dir: str, filename: str):
    # TODO: remove later
    deploy_dir = settings.DEPLOY_DIRECTORY
    os.system(f"cp {upload_dir}/{filename}.md {deploy_dir}/{filename}.md")
    os.system(f"bash {deploy_dir}/run_md2html.sh {deploy_dir} {filename}")
    os.system(f"cp {deploy_dir}/{filename}.html {output_dir}/{filename}.html")
    os.system(f"bash {deploy_dir}/cleanup_file.sh {deploy_dir} {filename}")


@router.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...), session: Session = Depends(get_session)
                             ):
    # TODO: change all logic to services
    uploaded_file = file
    print(file)
    upload_dir = settings.DATA_FOLDER_PATH
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)
    new_uid = str(uuid.uuid4())
    file_path = os.path.join(upload_dir, f"{new_uid}.md")
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

    output_file_path = os.path.join(output_dir, new_uid + ".html")
    # task = BackgroundTasks()
    # task.add_task(create_output_file, upload_dir, output_dir, new_uid)
    create_output_file(upload_dir, output_dir, new_uid)
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
    with open(output_file.data_path, "r") as f:
        content = f.read()
    # Escape the HTML content
    # print("filename", filename[-1])
    # return StaticFiles(directory=output_file.data_path, html=True)
    return HTMLResponse(content=content, status_code=200)

    # query = session.get(HTMLFile, )
