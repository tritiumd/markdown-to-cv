from fastapi import APIRouter
from api.routes import upload

api_router = APIRouter()
api_router.include_router(upload.router, tags=["upload"])
