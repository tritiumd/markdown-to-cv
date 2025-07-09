import os 
import fastapi


def create_app():
    app = fastapi.FastAPI(
        title="TritiumD CV REST API",
        description="A REST API for TritiumD Computer Vision",
        version="0.1.0",
        docs_url="/docs",
        redoc_url="/redoc"
    )


    app.include_router(health_router.router, prefix="/health", tags=["Health"])
    app.include_router(inference_router.router, prefix="/inference", tags=["Inference"])
    app.include_router(model_router.router, prefix="/model", tags=["Model"])
    app.include_router(dataset_router.router, prefix="/dataset", tags=["Dataset"])

    return app