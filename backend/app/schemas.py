from pydantic import BaseModel, EmailStr, ConfigDict, Field
from datetime import date

class UserBase(BaseModel):
    email: EmailStr = Field(..., description="Email do usuário")

class UserCreate(UserBase):
    password: str | None = Field(default = None, min_length=6, description="Senha com pelo menos 6 caracteres")
    full_name: str
    date_of_birth: date | None = None
    
class User(UserBase):
    id: int
    is_active: bool
    role: str
    full_name: str
    date_of_birth: date | None = None

    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None