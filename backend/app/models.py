from typing import Optional

from sqlmodel import Field, SQLModel
import datetime


# Database model, database table inferred from class name
class File(SQLModel):
    id: int = Field(default=None, nullable=False, primary_key=True)
    title: Optional[str]
    data_path: str
    owner_id: Optional[int] = 0  # Will change whenever we implement authentication and user table
    time_stamp: Optional[datetime.datetime] = datetime.datetime.now()


class MarkdownFile(File, table=True):
    uid: str


class HTMLFile(File, table=True):
    uid: str


class YAMLFile(File, table=True):
    uid: str
