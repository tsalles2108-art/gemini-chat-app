FROM node:18

WORKDIR /app

# Copia o package.json do diretório atual onde o Render está olhando
COPY package*.json ./

RUN npm install

# Copia todos os arquivos do diretório atual para dentro do contêiner
COPY . .

EXPOSE 10000

CMD ["npm", "start"]
