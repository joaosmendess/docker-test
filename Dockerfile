# Usar a imagem oficial do Node.js.
FROM node:20.14.0

# Criar e mudar para o diretório do aplicativo.
WORKDIR /usr/src/app

# Copiar os arquivos de dependências para a imagem do container.
COPY package*.json ./

# Instalar todas as dependências, incluindo as de desenvolvimento.
RUN npm install

# Copiar o código local para a imagem do container.
COPY . .

# Compilar o TypeScript para JavaScript.
RUN npm run build

# Informar ao Docker que a aplicação usa a porta 3000.
EXPOSE 3000

# Comando para iniciar a aplicação.
CMD [ "node", "dist/index.js" ]
