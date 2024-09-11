from pathlib import Path
from typing import Any, Optional

from app.core import utils
from app.core.config import settings
from app.core.db import get_session
from app.models import YAMLFile
from fastapi import APIRouter, BackgroundTasks, Depends
from fastapi.responses import FileResponse, HTMLResponse
from loguru import logger
from sqlmodel import Session, select

router = APIRouter()
logger.add("logs/output.log", rotation="1 day", retention="7 days", enqueue=True)


@router.get("/output-html/{task_id}")
@logger.catch
async def get_output_file(
    background_tasks: BackgroundTasks,
    task_id: Optional[str],
    download: Optional[bool] = False,
    language: Optional[str] = "en",
    session: Session = Depends(get_session),
) -> Any:
    try:
        logger.debug(f"get_output_file: {task_id}")
        task_result = utils.get_celery_task_result(task_id)
        logger.debug(f"task_result: {task_result.status}")
        if task_result.status == "PENDING":
            return HTMLResponse(status_code=202, content="Task is pending")
        if download:
            # find the uid of yaml from db use db session
            yaml_file = session.exec(
                select(YAMLFile).where(YAMLFile.task_id == task_id)
            ).one()
            export_task_id = utils.export_to_pdf(yaml_file.uid, language)

            # how can we wait for the task to finish and get the result
            export_task_result = await utils.wait_for_task(export_task_id)
            pdf_path = Path(settings.DATA_FOLDER_PATH_PDF) / f"{yaml_file.uid}.pdf"
            html_path = Path(settings.DATA_FOLDER_PATH_HTML) / f"{yaml_file.uid}.html"
            background_tasks.add_task(utils.delete_file, pdf_path)
            background_tasks.add_task(utils.delete_file, html_path)
            return FileResponse(
                path=pdf_path,
                filename="cv.pdf",
                media_type="application/pdf",
                background=background_tasks,
            )
        content = task_result.result

        return HTMLResponse(content=content, status_code=200)
    except Exception as e:
        logger.error(f"Error: {e}")
        return HTMLResponse(status_code=404, content=str(e))


@router.get("/output-html")
async def get_default_output() -> Any:
    logger.debug("get_default_output")
    if settings.ENVIRONMENT == "local":
        content = await utils.read_file(
            "/home/delus/Documents/PROJECT_DATA/markdown2cv-int/html/output.html"
        )
    elif settings.ENVIRONMENT == "production":
        content = await utils.read_file("/data/html/output.html")
    logger.info("content: %s", content)
    return HTMLResponse(content=content, status_code=200)


@router.get("/celery-output")
async def get_celery_output(id: str) -> Any:
    try:
        content = utils.get_celery_task_result(id)
        logger.debug(content)
    except Exception as e:
        logger.error("Error: %s", e)
        return HTMLResponse(status_code=404, content=str(e))
