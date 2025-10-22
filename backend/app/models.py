from sqlalchemy import Boolean, Column, Integer, String, Date
from .database import Base

#Model usado para tabela 'users'

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key = True, index = True)
    email = Column(String, unique = True, index = True, nullable = False)
    hashed_password = Column(String, nullable = False)
    is_active = Column(Boolean, default = True)

    role = Column(String, default='user', nullable=False)

    full_name = Column(String, nullable=False)
    date_of_birth = Column(Date, nullable=True)