from sqlmodel import Session, create_engine, select, SQLModel

from app import crud
from app.core.config import settings
from app.models import FileCreate

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))

def init_db():
    SQLModel.metadata.create_all(engine)
# make sure all SQLModel models are imported (app.models) before initializing DB
# otherwise, SQLModel might fail to initialize relationships properly
# for more details: https://github.com/tiangolo/full-stack-fastapi-template/issues/28

def get_session():
    with Session(engine) as session:
        yield session