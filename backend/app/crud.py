from sqlalchemy.orm import Session
from . import models, schemas
from .security import get_password_hash

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password = hashed_password, role='user')

    #adiciona no banco
    db.add(db_user)
    #salva no banco
    db.commit()

    #atualiza db_user com os dados gerados (id)
    db.refresh(db_user)

    return db_user