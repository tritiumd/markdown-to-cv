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
        "info": [{"icon": "", "data": ""}],
        "skill": "",
        "summary": "",
        "certificate": [],
        "education": [],
        "experience": [],
        "activity": [],
        "reference": [],
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
            {"year": "2021", "name": "Certificate name", "extra": "Extra information"},
        ],
        "education": [
            {
                "place": "University name",
                "major": "Your major",
                "time": "2021",
                "extra": "Extra information",
            }
        ],
        "experience": [
            {
                "place": "Company name",
                "phase": [
                    {
                        "time": "2021",
                        "position": "Your position",
                        "detail": "Your detail",
                    }
                ],
            }
        ],
        "activity": [
            {
                "place": "Club of something",
                "phase": [
                    {
                        "time": "2021",
                        "position": "Your position",
                        "detail": "Your detail",
                    }
                ],
            }
        ],
        "reference": [],
    }
    # parse data to pydantic form
    data_pydantic = FormSchema(**data)
    return data_pydantic


def delete_file(file_path: str):
    if os.path.exists(file_path):
        os.remove(file_path)


def test_submit_empty_form(client: TestClient, empty_form_pydantic: FormSchema):
    data = empty_form_pydantic.model_dump()
    response = client.post("/api/v1/submit-form", json=data)
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
    response = client.post("/api/v1/submit-form", json=data)
    assert response.status_code == 200
    # get response data
    assert response.json().get("uid", None) is not None
    filename = response.json().get("uid")
    # Check if file exists
    yaml_file = os.path.join(settings.DATA_FOLDER_PATH_YAML, f"{filename}.yaml")
    html_file = os.path.join(settings.DATA_FOLDER_PATH_HTML, f"{filename}.html")
    md_file = os.path.join(settings.DATA_FOLDER_PATH_MARKDOWN, f"{filename}.md")

    assert os.path.exists(yaml_file)
    assert os.path.exists(html_file)
    assert os.path.exists(md_file)
    # delete_file(file_path)


# Valid form data
valid_form_data = {
    "name": "John Doe",
    "position": "Software Engineer",
    "info": [
        {"icon": "phone", "data": "+1-555-123-4567"},
        {"icon": "email", "data": "john.doe@example.com"},
        {"icon": "location", "data": "New York, NY"},
    ],
    "summary": "A highly motivated software engineer with 5+ years of experience in developing web applications.",
    "skill": "Python, Java, JavaScript, SQL, AWS",
    "certificate": [
        {"year": "2022", "name": "AWS Certified Solutions Architect - Associate"},
        {"year": "2020", "name": "Certified ScrumMaster"},
    ],
    "education": [
        {
            "place": "University of California, Berkeley",
            "major": "Computer Science",
            "time": "2018-2022",
        },
    ],
    "experience": [
        {
            "place": "Google",
            "phase": [
                {
                    "time": "2022-Present",
                    "position": "Software Engineer",
                    "detail": "Developed and maintained web applications using Python and Django.",
                },
            ],
        },
    ],
    "activity": [
        {
            "place": "Open Source Contributor",
            "phase": [
                {
                    "time": "2020-Present",
                    "position": "Contributor",
                    "detail": "Contributed to open-source projects on GitHub.",
                },
            ],
        },
    ],
    "reference": [
        {"value": "Available upon request."},
    ],
}


@pytest.mark.parametrize(
    "data, status_code, message",
    [
        (valid_form_data, 200, "Form submitted successfully"),
        ({}, 422, "Validation error"),  # Missing required fields
        ({"name": "John Doe"}, 422, "Validation error"),  # Missing required fields
        (
            {"name": "John Doe", "position": "Software Engineer"},
            422,
            "Validation error",
        ),  # Missing required fields
        (
            {"name": "John Doe", "position": "Software Engineer", "info": []},
            422,
            "Validation error",
        ),  # Missing required fields
        (
            {
                "name": "John Doe",
                "position": "Software Engineer",
                "info": [{"icon": "phone", "data": "+1-555-123-4567"}],
                "summary": "A highly motivated software engineer with 5+ years of experience in developing web applications.",
            },
            422,
            "Validation error",
        ),  # Missing required fields
        (
            {
                "name": "John Doe" * 1000,
                "position": "Software Engineer",
                "info": [{"icon": "phone", "data": "+1-555-123-4567"}],
                "summary": "A highly motivated software engineer with 5+ years of experience in developing web applications.",
                "skill": "Python, Java, JavaScript, SQL, AWS",
            },
            422,
            "Validation error",
        ),  # Name too long
        (
            {
                "name": "",
                "position": "Software Engineer",
                "info": [{"icon": "phone", "data": "+1-555-123-4567"}],
                "summary": "A highly motivated software engineer with 5+ years of experience in developing web applications.",
                "skill": "Python, Java, JavaScript, SQL, AWS",
            },
            422,
            "Validation error",
        ),  # Name too short
        (
            {
                "name": "John Doe",
                "position": "" * 1000,
                "info": [{"icon": "phone", "data": "+1-555-123-4567"}],
                "summary": "A highly motivated software engineer with 5+ years of experience in developing web applications.",
                "skill": "Python, Java, JavaScript, SQL, AWS",
            },
            422,
            "Validation error",
        ),  # Position too long
        (
            {
                "name": "John Doe",
                "position": "",
                "info": [{"icon": "phone", "data": "+1-555-123-4567"}],
                "summary": "A highly motivated software engineer with 5+ years of experience in developing web applications.",
                "skill": "Python, Java, JavaScript, SQL, AWS",
            },
            422,
            "Validation error",
        ),  # Position too short
        (
            {
                "name": "John Doe",
                "position": "Software Engineer",
                "info": [{"icon": "phone", "data": "+1-555-123-4567"}],
                "summary": "A highly motivated software engineer with 5+ years of experience in developing web applications."
                * 1000,
                "skill": "Python, Java, JavaScript, SQL, AWS",
            },
            422,
            "Validation error",
        ),  # Summary too long
        (
            {
                "name": "John Doe",
                "position": "Software Engineer",
                "info": [{"icon": "phone", "data": "+1-555-123-4567"}],
                "summary": "",
                "skill": "Python, Java, JavaScript, SQL, AWS",
            },
            422,
            "Validation error",
        ),  # Summary too short
        (
            {
                "name": "John Doe",
                "position": "Software Engineer",
                "info": [{"icon": "phone", "data": "+1-555-123-4567"}],
                "summary": "A highly motivated software engineer with 5+ years of experience in developing web applications.",
                "skill": "Python, Java, JavaScript, SQL, AWS" * 1000,
            },
            422,
            "Validation error",
        ),  # Skill too long
        (
            {
                "name": "John Doe",
                "position": "Software Engineer",
                "info": [{"icon": "phone", "data": "+1-555-123-4567"}],
                "summary": "A highly motivated software engineer with 5+ years of experience in developing web applications.",
                "skill": "",
            },
            422,
            "Validation error",
        ),  # Skill too short
    ],
)
def test_submit_form(client: TestClient, data, status_code, message):
    # response = client.post("/api/v1/form/submit-form/", json=data)
    # assert response.status_code == status_code
    # assert message in response.json().get("message", "")
    pass
