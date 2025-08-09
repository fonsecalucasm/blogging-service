# Imagem base oficial do Node.js
FROM node:18-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência primeiro
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

ARG DATABASE_URL
ARG PORT

ENV DATABASE_URL=${DATABASE_URL}
ENV PORT=${PORT}

RUN echo "DATABASE_URL=${DATABASE_URL}" >> .env
RUN echo "PORT=${PORT}" >> .env

# Expõe a porta usada pela aplicação (altere conforme necessário)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
