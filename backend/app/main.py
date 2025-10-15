from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine

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

#injeção de dependencias para a sessão do banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# endpoint de cadastro
@app.post("/users", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail = "Email já registrado")
    return crud.create_user(db=db, user=user)
                


@app.get("/")

async def root():
    return {"message": "Olá mundo! nosso sistema de autenticação está no ar"}