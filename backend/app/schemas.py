from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str
    
#schema para ler/retornar os dados do usuario (nao inclui senha)
class User(UserBase):
    id:int
    is_active: bool

    #configuração para ler objeto SQLAlchemy (ORM)
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None