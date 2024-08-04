# Write CV on Markdown

## Tech stack
- Python 3.10
- FastAPI 0.111.0

## Features
- Drag and drop to upload files (MD file only)
- Fill in the form to generate a CV
- Download CV in PDF

## How to run
1. Clone this repository
2. Install dependencies
    ```bash
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ``` 
3. Run the backend
    ```bash
   flask run
    ```

# Testing (API):

- Swagger UI: http://localhost:8000/docs
- Redoc: http://localhost:8000/redoc

# Folder structure

- `app`: Contains the main application
- `app/api`: the API routes
- `app/core`: the configs, dependencies, and utilities
- `app/models`: the Pydantic models
- `app/tests`: the tests, run with `pytest` from backend root directory