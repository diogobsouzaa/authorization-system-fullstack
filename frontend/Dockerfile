#imagem
FROM node:18-alpine

#diretório
WORKDIR /app

COPY package*.json ./

#dependencias
RUN npm install

#copiando arquivos
COPY . .

#comando para rodar
CMD ["npm", "start"]