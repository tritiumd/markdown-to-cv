from typing import Any
from fastapi import APIRouter, File, UploadFile, HTTPException

router = APIRouter()

@router.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    return {"filename": file.filename}