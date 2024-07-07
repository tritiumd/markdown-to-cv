from fastapi import APIRouter
from app.api.routes import upload, form

api_router = APIRouter()
api_router.include_router(upload.router, tags=["upload"])
api_router.include_router(form.router, tags=["form"])