from sqlmodel import Field, SQLModel


# Shared properties
class ItemBase(SQLModel):
    name: str
    path: str


# Properties to receive on item creation
class ItemCreate(ItemBase):
    name: str
    path: str


# Properties to receive on item update
class ItemUpdate(ItemBase):
    name: str | None = None  # type: ignore


# Database model, database table inferred from class name
class Item(ItemBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str | None
    path: str
    owner_id: int | None = 0  # Will change whenever we implement authentication and user table
    owner: None


# Properties to return via API, id is always required
class ItemPublic(ItemBase):
    id: int
    owner_id: int


class ItemsPublic(SQLModel):
    data: list[ItemPublic]
    count: int
