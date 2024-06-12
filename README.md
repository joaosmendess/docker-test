# Node.js com TypeScript e SQLite no Docker

## Requisitos

- Docker
- Docker Compose (opcional)

## Configuração do Projeto

### Estrutura do Projeto

```plaintext
node-sqlite-ts/
├── src/
│   ├── index.ts
│   └── database.ts
├── Dockerfile
├── .dockerignore
├── package.json
├── package-lock.json
└── tsconfig.json
```

### Arquivo Dockerfile

```Dockerfile
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
```


## Como Construir a Imagem Docker

```sh
docker build -t node-sqlite-test .
```

### Para executar o container, use o seguinte comando:
```sh
docker run -p 3000:3000 node-sqlite-test
```

### Se a porta 3000 já estiver em uso, você pode mapear para uma porta diferente no host:
```sh
docker run -p 3001:3000 node-sqlite-test
```