import os
from typing import Any, Optional

from app.core import utils
from app.core.config import settings
from fastapi import APIRouter, BackgroundTasks
from fastapi.responses import FileResponse, HTMLResponse
from loguru import logger
from playwright.async_api import async_playwright

router = APIRouter()
logger.add("logs/output.log", rotation="1 day", retention="7 days", enqueue=True)


async def create_pdf(html_content: str, output_path: str):
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_content(html_content, wait_until="networkidle")
        await page.pdf(path=output_path)
        await browser.close()


@router.get("/output-html/{file_uid}")
@logger.catch
async def get_output_file(
    background_tasks: BackgroundTasks,
    file_uid: Optional[str],
    download: Optional[bool] = False,
) -> Any:
    try:
        logger.debug(f"get_output_file: {file_uid}")
        task_result = utils.get_celery_task_result(file_uid)
        if task_result.status == "PENDING":
            return HTMLResponse(status_code=202, content="Task is pending")
        content = task_result.result
        if download:
            pdf_path = "tmp/resume.pdf"
            html_content = content.decode("utf-8")
            await create_pdf(html_content, pdf_path)
            background_tasks.add_task(os.remove, pdf_path)
            return FileResponse(
                pdf_path,
                filename="resume.pdf",
                media_type="application/pdf",
                background=background_tasks,
            )

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
        content = await utils.get_celery_task_result(id)
        logger.info("content: %s", content)
        return HTMLResponse(content=content, status_code=200)
    except Exception as e:
        logger.error("Error: %s", e)
        return HTMLResponse(status_code=404, content=str(e))
