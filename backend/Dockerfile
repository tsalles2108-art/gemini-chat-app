FROM node:18

WORKDIR /app

# Avisamos o Docker para copiar o package.json de dentro da pasta backend
COPY backend/package*.json ./

RUN npm install

# Copiamos todo o conteúdo da pasta backend para o contêiner
COPY backend/ .

EXPOSE 10000

CMD ["npm", "start"]
