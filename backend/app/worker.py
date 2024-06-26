import subprocess
from app.core.config import settings
from celery import Celery

broker_url = (
    f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}/{settings.REDIS_QUEUE_DB}"
)
result_backend = (
    f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}/{settings.REDIS_BACKEND_DB}"
)

task_serializer = "json"
result_serializer = "json"
accept_content = ["json"]
timezone = "UTC"
enable_utc = True

celery_app = Celery(__name__, broker=broker_url, backend=result_backend, include=["app.worker"], task_serializer="json", result_serializer="json", accept_content=["json"], timezone="UTC", enable_utc=True)


@celery_app.task(name="create_output_file")
def create_output_file(upload_dir: str, output_dir: str, filename: str):
    deploy_dir = settings.DEPLOY_DIRECTORY
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
