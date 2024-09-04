from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import NoResultFound
from sqlmodel import Session, select
from starlette.responses import HTMLResponse

from app.core import utils
from app.core.db import get_session
from app.models import HTMLFile
from logging import getLogger

router = APIRouter()

logger = getLogger(__name__)


@router.get("/output-html/{file_uid}")
async def get_output_file(
    file_uid: str, session: Session = Depends(get_session)
) -> Any:
    # This is for default output
    try:
        if file_uid == "output":
            output_path = "/data/html/output.html"
            content = await utils.read_file(output_path)
            return HTMLResponse(content=file.content, status_code=200)
        else:
            task_result = utils.get_celery_task_result(file_uid)
            if task_result.status == "PENDING":
                return HTMLResponse(status_code=202, content="Task is pending")
            content = task_result.result
            return HTMLResponse(content=content, status_code=200)
    except Exception as e:
        return HTMLResponse(status_code=404, content=str(e))


@router.get("/output-html")
async def get_default_output() -> Any:
    content = await utils.read_file("/data/html/output.html")
    logger.info("content: %s", content)
    return HTMLResponse(content=content, status_code=200)


@router.get("/celery-output")
async def get_celery_output(id: str) -> Any:
    try:
        content = await utils.get_celery_task_result(id)
        logger.info("content: %s", content)
        return HTMLResponse(content=content, status_code=200)
    except Exception as e:
        logger.error("Error: %s", e)
        return HTMLResponse(status_code=404, content=str(e))
