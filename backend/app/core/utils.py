import asyncio
import datetime
import logging
import os
import time
from pathlib import Path

import aiofiles
from celery import Celery, chain, signature

from app.core.config import settings

logger = logging.getLogger(__name__)


def measure_time(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} took {end_time - start_time} seconds to complete.")
        return result

    return wrapper


deploy_dir = settings.DATA_FOLDER_PATH_DEPLOY
parent_dir = os.path.abspath(os.path.join(deploy_dir, os.pardir))

logger.debug("Broker URL: ", settings.CELERY_BROKER_URL)
logger.debug("Result Backend: ", settings.CELERY_RESULT_BACKEND)

celery_app = Celery(
    __name__,
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
    include=["worker"],
    task_serializer=settings.CELERY_TASK_SERIALIZER,
    result_serializer=settings.CELERY_RESULT_SERIALIZER,
    accept_content=settings.CELERY_ACCEPT_CONTENT,
    timezone=settings.CELERY_TIMEZONE,
    enable_utc=settings.CELERY_ENABLE_UTC,
)


# @measure_time
def md_to_html(filename: str) -> None:
    celery_app.send_task("md_to_html", args=[filename])
    logger.info("Send task to create output file")


def get_current_time() -> str:
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def yaml_to_html(filename: str, language: str) -> str:
    """Yaml to html

    Args:
        filename (str): uid of the file
        language (str): language of the CV
    """
    task = celery_app.send_task("yaml_to_html", args=[filename, language])
    logger.info("Send task to create html file")
    return task.id


def export_to_pdf(filename: str, language: str) -> str:
    """Export to pdf

    Args:
        filename (str): uid of the file
    """
    # # First create the html file
    # task = celery_app.send_task("md_to_html", args=[filename])
    # # when task is finished, create the pdf file
    # task = celery_app.send_task("export_to_pdf", args=[filename])

    task_chain = chain(
        signature("yaml_to_html", args=[filename, language, True])
        | signature("html_to_pdf", imutable=True),
    )
    try:
        task = task_chain.apply_async()
        logger.info("Send task to create pdf file")
        return task.id
    except Exception as e:
        logger.error("Error: ", e)
        raise


def get_celery_task_result(task_id: str) -> any:
    result = celery_app.AsyncResult(task_id)
    return result


async def wait_for_task(task_id: str, timeout: int = 300, interval: float = 2.0) -> any:
    """
    Asynchronously wait for a Celery task to complete and return its result.

    Args:
        task_id (str): The ID of the Celery task to wait for.
        timeout (int): Maximum time to wait for the task in seconds. Defaults to 300 seconds (5 minutes).
        interval (float): Time to wait between status checks in seconds. Defaults to 2 seconds.

    Returns:
        Any: The result of the Celery task.

    Raises:
        TimeoutError: If the task doesn't complete within the specified timeout.
        Exception: If the task fails or returns an exception.
    """
    start_time = time.time()
    result = celery_app.AsyncResult(task_id)

    while True:
        if result.ready():
            if result.successful():
                logger.info(f"Task {task_id} completed successfully")
                return result.get()
            else:
                logger.error(f"Task {task_id} failed")
                raise result.result

        if time.time() - start_time > timeout:
            logger.error(f"Task {task_id} timed out after {timeout} seconds")
            raise TimeoutError(
                f"Task {task_id} did not complete within {timeout} seconds"
            )

        logger.debug(f"Task {task_id} status: {result.status}")
        await asyncio.sleep(interval)


# @measure_time
def create_markdown_file(filename: str) -> None:
    celery_app.send_task("create_markdown_file", args=[filename])
    logger.info("Send task to create markdown file")


async def read_file(file_path: str) -> str:
    async with aiofiles.open(file_path, "r") as f:
        content = await f.read()
    return content


async def write_file(file_path: str, content: bytes | str) -> None:
    if isinstance(content, bytes):
        async with aiofiles.open(file_path, "wb") as f:
            await f.write(content)
    else:
        async with aiofiles.open(file_path, "w") as f:
            await f.write(content)


def delete_file(file_path: Path) -> None:
    """Delete file utils instead of import os directly

    Args:
        file_path (str): File path
    """
    os.remove(file_path)
    logger.info(f"Deleted file: {file_path}")
