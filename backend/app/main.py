from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
from . import crud, models, schemas, security
from .database import SessionLocal, engine

from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm


#cria todas as tableas no banco de dados 
models.Base.metadata.create_all(bind=engine)

app = FastAPI()


origins = ["http://localhost:3000",]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permite as origens definidas acima
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)
#incluido em security.py
#injeção de dependencias para a sessão do banco de dados
#def get_db():
#    db = SessionLocal()
#    try:
#        yield db
#    finally:
#        db.close()


@app.get("/")

async def root():
    return {"message": "Olá mundo! nosso sistema de autenticação está no ar"}




@app.post("/token", response_model=schemas.Token)
def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(security.get_db)):
    user = crud.get_user_by_email(db, email=form_data.username)

    #verificando se o usuario existe e se a senha está correta
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
            headers = {"WWW-Authenticate": "Bearer"},
        )
    
    access_token = security.create_access_token(
        data={"sub": user.email}
    )

    return {"access_token": access_token, "token_type": "bearer"}

# endpoint de cadastro
@app.post("/users", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(security.get_db)):
    print(f"Dados recebidos: email={user.email}, password_length={len(user.password)}")
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail = "Email já registrado")
    return crud.create_user(db=db, user=user)

#endpoint protegido
@app.get("/users/me", response_model = schemas.User)
def read_users_me(current_user:Annotated[models.User, Depends(security.get_current_user)]):
    return current_user