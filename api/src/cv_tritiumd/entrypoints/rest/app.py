import os
import fastapi
import uvicorn
from api.src.cv_tritiumd.entrypoints.rest.routers.upload import router as upload_router
from api.src.cv_tritiumd.entrypoints.rest.routers.form import router as form_router
from api.src.cv_tritiumd.entrypoints.rest.routers.output import router as output_router
# from cv_tritiumd.entrypoints.rest import routers


def create_app():
    app = fastapi.FastAPI(
        title="TritiumD CV REST API",
        description="A REST API for TritiumD",
        version="0.1.0",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    app.include_router(upload_router)
    app.include_router(form_router)
    app.include_router(output_router)
    # app.include_router(routers, prefix="/api/v1")

    return app


def run():
    app = create_app()
    port = int(os.environ.get("PORT", 8000))

    uvicorn.run(app, host="0.0.0.0", port=port)
