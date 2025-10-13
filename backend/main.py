from fastapi import FastAPI

app = FastAPI()

@app.get("/")

async def root():
    return {"message": "Olá mundo! nosso sistema de autenticação está no ar"}