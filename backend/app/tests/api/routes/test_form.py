import os

from fastapi.testclient import TestClient

import pytest

from app.core.config import settings
from app.api.routes.form import FormSchema


@pytest.fixture(scope="module")
def empty_form_pydantic():
    data = {
        "name": "",
        "position": "",
        "info": [
            {"icon": "", "data": ""}
        ],
        "skill": "",
        "summary": "",
        "certificate": [
        ],
        "education": [
        ],
        "experience": [
        ],
        "activity": [
        ],
        "reference": [
        ]
    }
    # parse data to pydantic form
    data_pydantic = FormSchema(**data)
    return data_pydantic


@pytest.fixture(scope="module")
def default_form_pydantic():
    data = {
        "name": "Your name",
        "position": "Applying Position",
        "info": [
            {"icon": "fa-phone", "data": "Your phone number"},
            {"icon": "fa-envelope", "data": "Your email"},
            {"icon": "fab .fa-github", "data": "Your github"},
        ],
        "skill": "",
        "summary": "Your summary",
        "certificate": [
            {
                "year": "2021",
                "name": "Certificate name",
            },
            {
                "year": "2021",
                "name": "Certificate name",
                "extra": "Extra information"
            }
        ],
        "education": [
            {
                "place": "University name",
                "major": "Your major",
                "time": "2021",
                "extra": "Extra information"
            }
        ],
        "experience": [
            {
                "place": "Company name",
                "phase": [{
                    "time": "2021",
                    "position": "Your position",
                    "detail": "Your detail"
                }]
            }
        ],
        "activity": [
            {
                "place": "Club of something",
                "phase": [
                    {
                        "time": "2021",
                        "position": "Your position",
                        "detail": "Your detail"
                    }
                ]
            }
        ],
        "reference": [
        ]
    }
    # parse data to pydantic form
    data_pydantic = FormSchema(**data)
    return data_pydantic


def delete_file(file_path: str):
    if os.path.exists(file_path):
        os.remove(file_path)


def test_submit_empty_form(client: TestClient, empty_form_pydantic: FormSchema):
    data = empty_form_pydantic.model_dump()
    response = client.post(
        "/api/v1/submit-form",
        json=data
    )
    assert response.status_code == 200
    # get response data
    assert response.json().get("uid", None) is not None
    filename = response.json().get("uid")
    # Check if file exists
    # Get settings from config

    file_dir = settings.DATA_FOLDER_PATH_YAML
    file_path = os.path.join(file_dir, f"{filename}.yaml")
    assert os.path.exists(file_path)
    delete_file(file_path)


def test_submit_default_form(client: TestClient, default_form_pydantic: FormSchema):
    data = default_form_pydantic.dict()
    response = client.post(
        "/api/v1/submit-form",
        json=data
    )
    assert response.status_code == 200
    # get response data
    assert response.json().get("uid", None) is not None
    filename = response.json().get("uid")
    # Check if file exists
    file_dir = settings.DATA_FOLDER_PATH_YAML
    file_path = os.path.join(file_dir, f"{filename}.yaml")
    assert os.path.exists(file_path)
    # delete_file(file_path)


def test_submit_and_upload(client: TestClient, default_form_pydantic: FormSchema):
    data = default_form_pydantic.dict()
    response = client.post(
        "/api/v1/submit-form",
        json=data
    )
    assert response.status_code == 200
    # get response data
    assert response.json().get("uid", None) is not None
    filename = response.json().get("uid")
    # Check if md file exists
    file_dir = settings.DATA_FOLDER_PATH_MARKDOWN
    file_path = os.path.join(file_dir, f"{filename}.md")
    assert os.path.exists(file_path)

    # read md file
    with open(file_path, "r") as f:
        content = f.read()

    assert content is not None
    response = client.post(
        "/api/v1/upload-md",
        files={"file": ("test.md", content, "text/markdown")},
    )
    assert response.status_code == 200
    # get response data
    assert response.json().get("uid", None) is not None
