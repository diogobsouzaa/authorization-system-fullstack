from pydantic import BaseModel, EmailStr, ConfigDict, Field

class UserBase(BaseModel):
    email: EmailStr = Field(..., description="Email do usuário")

class UserCreate(UserBase):
    password: str = Field(..., min_length=6, description="Senha com pelo menos 6 caracteres")
    
class User(UserBase):
    id: int
    is_active: bool
    role: str

    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None