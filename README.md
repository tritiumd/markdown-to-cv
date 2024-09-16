# Tritiumd - CV

Tritiumd-CV is a tool that converts form into professional CVs, downloads as PDF and HTML.

## Features

- Convert Form to HTML, PDF
- Easy to use

## Instructions

This instructions is written for Ubuntu. If you are using another OS, please modify by yourself.

To install the project, follow these steps:

1. Clone the repository and this repo https://github.com/kidclone3/pandoc-cv.git

2. Create .env file in both frontend and backend folders:

   - Copy `/backend/.env.example` to `/backend/.env`
   - Copy `/frontend/.env.example` to `/frontend/.env`

3. Create a folder to store all uploads file, for example: `markdown2cv-data` and all subfolders `yaml`, `html`, `pdf`, `markdown`.

4. Modify env values:
   - In `/backend/.env`:
     - Set `DATA_FOLDER_PATH_DOCKER` to `markdown2cv-data` from step 3
     - Set `DATA_FOLDER_PATH_ENGINE` to `pandoc-cv` repo from step 1
   - In `/frontend/.env`:
     - Set `NEXT_PUBLIC_BASE_URL` to `http://127.0.0.1:8000/api/v1`
5. Install dependencies:

   - Backend:

     ```bash
     cd backend
     python3 -m venv venv
     source venv/bin/activate
     pip install -r requirements.txt
     ```

   - Frontend:

     ```bash
     cd frontend
     npm install
     ```

6. Run the project:

   - Setup docker for engine, database and redis
     ```bash
     bash run_dev_server.sh
     ```
   - Backend:

     ```bash
     cd backend
     source venv/bin/activate
     fastapi dev --host 0.0.0.0
     ```

   - Frontend:

     ```bash
     cd frontend
     npm run dev
     ```
