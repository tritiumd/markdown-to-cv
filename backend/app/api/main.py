from fastapi import APIRouter
from app.api.routes import upload, form, output

api_router = APIRouter()
api_router.include_router(upload.router, tags=["upload"])
api_router.include_router(form.router, tags=["form"])
api_router.include_router(output.router, tags=["output"])
