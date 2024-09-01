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
async def get_output_file(file_uid: str, session: Session = Depends(get_session)) -> Any:
    try:
        query = select(HTMLFile).where(HTMLFile.uid == file_uid)
        output_file = session.exec(query).first()
        if not output_file:
            raise HTTPException(status_code=404, detail="File not found")
        content = await utils.read_file(output_file.data_path)
        return HTMLResponse(content=content, status_code=200)
    except NoResultFound:
        return HTMLResponse(status_code=404, content="File not found")
    except Exception as e:
        return HTMLResponse(status_code=404, content=str(e))


@router.get("/output-html")
async def get_default_output() -> Any:
    content = await utils.read_file("example/test.html")
    logger.info("content: %s", content)
    return HTMLResponse(content=content, status_code=200)
