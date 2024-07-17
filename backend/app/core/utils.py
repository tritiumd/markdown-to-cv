import subprocess

import aiofiles
import os
from app.core.config import settings
import time


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

@measure_time
def create_output_file(filename: str) -> None:
    upload_dir = settings.DATA_FOLDER_PATH_MARKDOWN
    output_dir = settings.DATA_FOLDER_PATH_HTML
    subprocess.run(["cp", f"{upload_dir}/{filename}.md", f"{deploy_dir}/{filename}.md"], check=True)
    subprocess.run(["bash", f"{deploy_dir}/run_md2html.sh", parent_dir, f"deploy/{filename}"], check=True)
    subprocess.run(["cp", f"{deploy_dir}/{filename}.html", f"{output_dir}/{filename}.html"], check=True)
    subprocess.run(f"rm -r {deploy_dir}/{filename}.*", shell=True)


@measure_time
def create_markdown_file(filename: str) -> None:
    upload_dir = settings.DATA_FOLDER_PATH_YAML
    output_dir = settings.DATA_FOLDER_PATH_MARKDOWN

    subprocess.run(["cp", f"{upload_dir}/{filename}.yaml", f"{deploy_dir}/{filename}.yaml"], check=True)
    subprocess.run(["bash", f"{deploy_dir}/run_yaml2md.sh", deploy_dir, f"deploy/{filename}"], check=True)
    subprocess.run(["cp", f"{deploy_dir}/{filename}.md", f"{output_dir}/{filename}.md"], check=True)
    subprocess.run(f"rm -r {deploy_dir}/{filename}.*", shell=True)


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
