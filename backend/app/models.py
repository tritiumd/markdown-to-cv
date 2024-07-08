from typing import Optional

from sqlmodel import Field, SQLModel
import datetime


# Shared properties
class FileBase(SQLModel):
    title: str
    data_path: str


# Properties to receive on item creation
class FileCreate(FileBase):
    title: str
    data_path: str


# Properties to receive on item update
class FileUpdate(FileBase):
    title: str | None = None  # type: ignore


# Database model, database table inferred from class name
class File(FileBase):
    id: int = Field(default=None, nullable=False, primary_key=True)
    title: Optional[str]
    data_path: str
    owner_id: int | None = 0  # Will change whenever we implement authentication and user table
    time_stamp: Optional[datetime.datetime] = None


class MarkdownFile(File, table=True):
    pass


class HTMLFile(File, table=True):
    uid: str


class YAMLFile(File, table=True):
    uid: str
