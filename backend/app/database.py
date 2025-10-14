import os 
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

#URL do banco de dados
SQLALCHEMY_DATABASE_URL = os.getenv("DATABSE_URL")

#engine cominicação da sqlalchemy
engine = create_engine(SQLALCHEMY_DATABASE_URL)

#sessão de banco de dados
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

#cada modelo (tabelas) do banco de dados
Base = declarative_base()