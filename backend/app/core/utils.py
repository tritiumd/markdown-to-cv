import subprocess

from app.core.config import settings


def create_output_file(upload_dir: str, output_dir: str, filename: str):
    deploy_dir = settings.DATA_FOLDER_PATH_DEPLOY
    subprocess.run(["cp", f"{upload_dir}/{filename}.md", f"{deploy_dir}/{filename}.md"], check=True)
    subprocess.run(["bash", f"{deploy_dir}/run_md2html.sh", deploy_dir, filename], check=True)
    subprocess.run(["cp", f"{deploy_dir}/{filename}.html", f"{output_dir}/{filename}.html"], check=True)
    subprocess.run(["bash", f"{deploy_dir}/cleanup_file.sh", deploy_dir, filename], check=True)


def create_markdown_file(filename: str):
    upload_dir = settings.DATA_FOLDER_PATH_YAML
    output_dir = settings.DATA_FOLDER_PATH_MARKDOWN
    deploy_dir = settings.DATA_FOLDER_PATH_DEPLOY

    subprocess.run(["cp", f"{upload_dir}/{filename}.yaml", f"{deploy_dir}/{filename}.yaml"], check=True)
    subprocess.run(["bash", f"{deploy_dir}/run_yaml2md.sh", deploy_dir, filename], check=True)
    subprocess.run(["cp", f"{deploy_dir}/{filename}.md", f"{output_dir}/{filename}.md"], check=True)
    subprocess.run(["bash", f"{deploy_dir}/cleanup_file.sh", deploy_dir, filename], check=True)
