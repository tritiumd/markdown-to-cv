from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
from starlette.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles
from app.api.main import api_router
from app.core.config import settings
from app.core.db import init_db
from logging.config import dictConfig
import os
from datetime import datetime

app = FastAPI(
    title=settings.PROJECT_NAME,
)

filename = os.path.join(
    os.environ.get("LOG_FOLDER", "."),
    "webserver_error_%s.log" % (datetime.now().strftime("%Y-%m-%d")),
)
dictConfig(
    {
        "version": 1,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] %(levelname)s %(filename)s line %(lineno)d: %(message)s",
                "datefmt": "%Y-%m-%d %H:%M:%S",
            }
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "formatter": "default",
                "level": "DEBUG",
            },
            "file": {
                "class": "logging.FileHandler",
                "formatter": "default",
                "filename": filename,
                "level": "ERROR",
            },
        },
        "root": {"level": "DEBUG", "handlers": ["console", "file"]},
    }
)
# add openapi redoc
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title=settings.PROJECT_NAME,
        version="0.1.0",
        description="I don't know what to put here",
        routes=app.routes,
    )
    openapi_schema["info"]["x-logo"] = {
        "url": "https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png"
    }

    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi

app.mount("/static", StaticFiles(directory=settings.DATA_FOLDER_PATH_HTML), name="static")

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            str(origin).strip("/") for origin in settings.BACKEND_CORS_ORIGINS
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.on_event("startup")
def on_startup():
    init_db()
