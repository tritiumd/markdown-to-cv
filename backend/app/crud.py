from sqlmodel import Session

from app.models import File, FileCreate, MarkdownFile


def create_item(*, session: Session, item_in: FileCreate, owner_id: int) -> File:
    db_item = File.model_validate(item_in, update={"owner_id": owner_id})
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item


def upload_markdown(*, session: Session, item_in: FileCreate, owner_id: int) -> MarkdownFile:
    db_item = MarkdownFile.model_validate(item_in, update={"owner_id": owner_id})
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item
