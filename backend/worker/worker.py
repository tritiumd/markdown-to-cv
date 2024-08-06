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


@celery_app.task(name="create_output_file")
def create_output_file(upload_dir: str, output_dir: str, filename: str):
    deploy_dir = DEPLOY_DIRECTORY
    subprocess.run(
        ["cp", f"{upload_dir}/{filename}.md", f"{deploy_dir}/{filename}.md"], check=True
    )
    subprocess.run(
        ["bash", f"{deploy_dir}/run_md2html.sh", deploy_dir, filename], check=True
    )
    subprocess.run(
        ["cp", f"{deploy_dir}/{filename}.html", f"{output_dir}/{filename}.html"],
        check=True,
    )
    subprocess.run(
        ["bash", f"{deploy_dir}/cleanup_file.sh", deploy_dir, filename], check=True
    )
