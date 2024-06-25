from fastapi.testclient import TestClient

import pytest


# Write fixture to reduce call api multiple times
@pytest.fixture(scope="module")
def upload_file_correct_file(client: TestClient):
    with open("/home/delus/Documents/code/personal/markdown-to-cv/backend/app/tests/abc.md", "r") as f:
        content = f.read()
    response = client.post(
        "/api/v1/uploadfile/",
        files={"file": ("abc.md", content, "text/markdown")},
    )
    return response


def test_upload_file(client: TestClient, upload_file_correct_file):
    assert upload_file_correct_file.status_code == 200
    assert upload_file_correct_file.json().get("filename") == "abc.md"


def test_upload_non_markdown(client: TestClient):
    content = "This is not a markdown file"
    response = client.post(
        "/api/v1/uploadfile/",
        files={"file": ("abc.txt", content, "text/markdown")},
    )
    assert response.status_code == 406

    response = client.post(
        "/api/v1/uploadfile/",
        files={"file": ("abc.md", content, "text/plain")},
    )
    assert response.status_code == 406


def test_get_output_file(client: TestClient, upload_file_correct_file):
    filename = upload_file_correct_file.json().get("filename")
    uid = upload_file_correct_file.json().get("uid")

    response = client.get(f"/api/v1/outputfile?file_uid={uid}")
    assert response.status_code == 200
