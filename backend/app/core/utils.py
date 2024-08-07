import aiofiles
import os
from app.core.config import settings
import time
import celery
import logging
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

celery_app = celery.Celery(
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

def yaml_to_html(filename: str) -> None:
    celery_app.send_task("yaml_to_html", args=[filename])
    logger.info("Send task to create html file")

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
