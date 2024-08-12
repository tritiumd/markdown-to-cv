import subprocess
import os
from celery import Celery

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = os.getenv("REDIS_PORT", "6379")
REDIS_QUEUE_DB = os.getenv("REDIS_QUEUE_DB", "0")
REDIS_BACKEND_DB = os.getenv("REDIS_BACKEND_DB", "1")
DEPLOY_DIRECTORY = os.getenv("DEPLOY_DIRECTORY", "/tmp")

broker_url = f"redis://{REDIS_HOST}:{REDIS_PORT}/{REDIS_QUEUE_DB}"
result_backend = f"redis://{REDIS_HOST}:{REDIS_PORT}/{REDIS_BACKEND_DB}"

task_serializer = "json"
result_serializer = "json"
accept_content = ["json"]
timezone = "UTC"
enable_utc = True

celery_app = Celery(
    __name__,
    broker=broker_url,
    backend=result_backend,
    include=["worker"],
    task_serializer=task_serializer,
    result_serializer=result_serializer,
    accept_content=accept_content,
    timezone=timezone,
    enable_utc=enable_utc,
)


DATA_FOLDER_PATH_DEPLOY = os.getenv("DATA_FOLDER_PATH_DEPLOY", "/deploy")
DATA_FOLDER_PATH_MARKDOWN = os.getenv("DATA_FOLDER_PATH_MARKDOWN", "/data/markdown")
DATA_FOLDER_PATH_HTML = os.getenv("DATA_FOLDER_PATH_HTML", "/data/html")
DATA_FOLDER_PATH_YAML = os.getenv("DATA_FOLDER_PATH_YAML", "/data/yaml")

deploy_dir = DATA_FOLDER_PATH_DEPLOY
parent_dir = os.path.abspath(os.path.join(deploy_dir, os.pardir))


@celery_app.task(name="md_to_html")
def md_to_html(filename: str) -> None:
    upload_dir = DATA_FOLDER_PATH_MARKDOWN
    output_dir = DATA_FOLDER_PATH_HTML

    md_file = f"{upload_dir}/{filename}.md"
    html_file = f"{output_dir}/{filename}.html"
    command = f""" 
    echo "" |\
        pandoc --data-dir /pandoc --template pandoc-cv.html5 -L pandoc-cv-html-sup.lua -o {html_file} {md_file}
    """
    subprocess.run(command, shell=True)


@celery_app.task(name="create_markdown_file")
def create_markdown_file(filename: str) -> None:
    upload_dir = DATA_FOLDER_PATH_YAML
    output_dir = DATA_FOLDER_PATH_MARKDOWN

    subprocess.run(
        ["cp", f"{upload_dir}/{filename}.yaml", f"{deploy_dir}/{filename}.yaml"],
        check=True,
    )
    subprocess.run(
        ["bash", f"{deploy_dir}/run_yaml2md.sh", parent_dir, f"deploy/{filename}"],
        check=True,
    )
    subprocess.run(
        ["cp", f"{deploy_dir}/{filename}.md", f"{output_dir}/{filename}.md"], check=True
    )
    subprocess.run(f"rm -r {deploy_dir}/{filename}.*", shell=True)


@celery_app.task(name="yaml_to_html")
def yaml_to_html(filename: str) -> None:
    upload_dir = DATA_FOLDER_PATH_YAML
    output_dir = DATA_FOLDER_PATH_HTML

    yaml_file = f"{upload_dir}/{filename}.yaml"
    html_file = f"{output_dir}/{filename}.html"
    command = f""" 
    echo "" |\
        pandoc --data-dir /pandoc --metadata-file {yaml_file} --template pandoc-cv.markdown | \
        pandoc --data-dir /pandoc --template pandoc-cv.html5 -L pandoc-cv-html-sup.lua -o {html_file}
    """
    subprocess.run(command, shell=True)
