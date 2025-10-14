#image base
FROM python:3.10-slim

#diretório padrão do conteiner
WORKDIR /app

#copia requerimentos
COPY requirements.txt .

#instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

#copiar todo o codigo do backend
COPY . .

#comando de execução do Docker
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]