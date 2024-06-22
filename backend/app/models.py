from sqlmodel import Field, SQLModel


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
    title: str | None
    data_path: str
    owner_id: int | None = 0  # Will change whenever we implement authentication and user table


class MarkdownFile(File, table=True):
    id: int = Field(default=None, nullable=False, primary_key=True)


class HTMLFile(File, table=True):
    id: int = Field(default=None, nullable=False, primary_key=True)
    uid: str
