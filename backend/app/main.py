from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
from . import crud, models, schemas, security, database
from .database import SessionLocal, engine

from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm

import time
import os
from sqlalchemy import exc, text

from starlette.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth
from .config import settings

from starlette.middleware.sessions import SessionMiddleware

def wait_for_db():
    """
    aguarda o banco de dados ficar disponível antes de prosseguir
    """
    max_retries = 10
    retry_interval = 3
    
    for attempt in range(max_retries):
        try:
            # Tenta estabelecer uma conexão simples
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            print("Conexão com o banco estabelecida")
            return True
        except exc.OperationalError:
            if attempt < max_retries - 1:
                print(f"Aguardando banco... ({attempt + 1}/{max_retries})")
                time.sleep(retry_interval)
            else:
                print("Não foi possível conectar ao banco após várias tentativas")
                raise

# aguarda o banco ficar pronto antes de criar tabelas
wait_for_db()
models.Base.metadata.create_all(bind=engine)
print("Tabelas criadas com sucesso")


#cria todas as tableas no banco de dados 
#models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(SessionMiddleware, secret_key=settings.SECRET_KEY)

#autorização do cliente Authlib / OAuth
oauth = OAuth()
oauth.register(
    name='google',
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs = {'scope': 'openid email profile'}
)


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
            status_code=400,
            detail="Senha ou email incorreto",
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

@app.get("/admin/data")
def read_admin_data(current_user: Annotated[models.User, Depends(security.get_current_admin_user)]):
    #rota protegida, somente usuarios com role 'admin'
    return {"message" : "Bem-Vindo, Admin!", "user": current_user.email}

@app.get("/login/google")
async def login_google(request: Request):
    redirect_uri = request.url_for('auth_google') 
    return await oauth.google.authorize_redirect(request, redirect_uri)

@app.get("/auth/google", name="auth_google")
async def auth_google(request: Request, db: Session = Depends(security.get_db)):
    """
    processa a resposta do Google, cria/encontra o usuário,
    cria um token JWT local e redireciona o usuário de volta para o frontend.
    """
    try:
        token = await oauth.google.authorize_access_token(request)
    except Exception as e:
        raise HTTPException(status_code=401, detail="Falha ao autorizar com o Google.")
    
    #pede os dados do usuario ao google usando o token deles
    user_info = token.get("userinfo")
    if not user_info:
        raise HTTPException(status_code=400, detail="Não foi possivel obter informações do usuário do Google")
    
    user_email = user_info['email']
    user_name = user_info.get("name", "Usuário Google")
    db_user = crud.get_user_by_email(db, email=user_email)
    if not db_user:
        #usuario não existe
        new_user_schema = schemas.UserCreate(email=user_email, password=None, full_name=user_name, date_of_birth=None)
        db_user = crud.create_user(db=db, user=new_user_schema)
    
    #criando token JWT
    access_token = security.create_access_token(
        data={"sub": db_user.email}
    )

    #redirecionando usuario
    response = RedirectResponse(url=f"http://localhost:3000?token={access_token}")
    return response
