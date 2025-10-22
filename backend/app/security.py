from passlib.context import CryptContext

from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from .config import settings

from .database import SessionLocal
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from . import crud, models, schemas

#contexto de criptografia de senha
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#esquema de segurança
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_password_hash(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password:str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data:dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes = settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    
    return encoded_jwt

#função de dependencia
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar credenciais",
        headers={"WWW-Authenticate":"Bearer"},
    )

    try:
        #decodificar o token
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str= payload.get("sub")

        if email is None:
            raise credentials_exception
        
        token_data = schemas.TokenData(email=email)
    except JWTError:
        #se token invalido
        raise credentials_exception
    
    user = crud.get_user_by_email(db, email=token_data.email)
    if user is None: 
        #se o usuario do token não existir mais no banco de dados
        raise credentials_exception
    
    return user

def get_current_admin_user(current_user: models.User = Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(
            status_code = status.HTTP_403_FORBIDDEN,
            detail = "Acesso negado: Requer privilégios de administrador"
        )
    return current_user