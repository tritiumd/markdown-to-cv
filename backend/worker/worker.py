import logging
import os
import subprocess
from typing import Optional

from celery import Celery

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = os.getenv("REDIS_PORT", "6379")
REDIS_QUEUE_DB = os.getenv("REDIS_QUEUE_DB", "0")
REDIS_BACKEND_DB = os.getenv("REDIS_BACKEND_DB", "1")

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
DATA_FOLDER_PATH_PDF = os.getenv("DATA_FOLDER_PATH_PDF", "/data/pdf")

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
        pandoc  --template /engine/pandoc/templates/pandoc-cv.html5 -L /engine/pandoc/filters/pandoc-cv-html-sup.lua -o {html_file} {md_file}
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


@celery_app.task(name="yaml_to_html", track_started=True)
def yaml_to_html(filename: str, language: str, is_save: bool = False) -> Optional[str]:
    upload_dir = DATA_FOLDER_PATH_YAML
    output_dir = DATA_FOLDER_PATH_HTML

    yaml_file = f"{upload_dir}/{filename}.yaml"
    map_language = {
        "vi": "",
        "en": "-en",
    }
    # check if file yaml exists
    if not os.path.exists(yaml_file):
        logging.error(f"File {yaml_file} not found")
        return
    if not is_save:
        command = f""" 
        echo "" |\
            pandoc  --metadata-file {yaml_file} --template /engine/pandoc/templates/pandoc-cv{map_language[language]}.markdown --wrap none | \
            pandoc  --template /engine/pandoc/templates/pandoc-cv.html5 -L /engine/pandoc/filters/pandoc-cv-html-sup.lua
        """
        result = subprocess.run(command, shell=True, capture_output=True)
        return result.stdout
    else:
        html_file = f"{output_dir}/{filename}.html"
        command = f""" 
        echo "" |\
            pandoc  --metadata-file {yaml_file} --template /engine/pandoc/templates/pandoc-cv{map_language[language]}.markdown --wrap none | \
            pandoc  --template /engine/pandoc/templates/pandoc-cv.html5 -L /engine/pandoc/filters/pandoc-cv-html-sup.lua -o {html_file}
        """
        subprocess.run(command, shell=True)
        return filename


@celery_app.task(name="html_to_pdf", track_started=True)
def html_to_pdf(filename: str) -> None:
    upload_dir = DATA_FOLDER_PATH_HTML
    output_dir = DATA_FOLDER_PATH_PDF

    print("filename: ", filename)
    # print("another_arg: ", another_arg)
    html_file = f"{upload_dir}/{filename}.html"
    pdf_file = f"{output_dir}/{filename}.pdf"

    command = f""" 
    echo "" |\
        chromium  --headless --no-sandbox --run-all-compositor-stages-before-draw --virtual-time-budget=100 --print-to-pdf={pdf_file} {html_file}
    """
    subprocess.run(command, shell=True)
