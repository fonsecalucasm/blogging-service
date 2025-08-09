# Blogging Service 📝

Uma aplicação **NestJS** com **MongoDB** para gerenciamento de postagens, construída para rodar facilmente via **Docker** e **Docker Compose**.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Docker](https://www.docker.com/get-started) (>= 20.x)
- [Docker Compose](https://docs.docker.com/compose/install/) (>= 1.29)
- [Node.js](https://nodejs.org/) (>= 18.x) — _apenas se for rodar localmente sem Docker_

---

## ⚙️ Configuração

1. **Clonar o repositório**

```bash
git clone git@github.com:fonsecalucasm/blogging-service.git
cd blogging-service
```

2. **Configurar variáveis de ambiente**

Use o arquivo `.env.example` como base para criar um `.env`:

```bash
cp .env.example .env
```

Preencha as variáveis conforme necessário.

---

## 🚀 Rodando com Docker

1. **Subir a aplicação e o banco de dados**

```bash
docker-compose up --build
```

Isso iniciará:

- **app**: aplicação NestJS acessível em `http://localhost:3000`
- **mongo**: banco de dados MongoDB na porta `27017`

2. **Parar a aplicação**

```bash
docker-compose down
```

---

## 💻 Rodando localmente (sem Docker)

1. **Instalar dependências**

```bash
npm install
```

2. **Rodar em modo desenvolvimento**

```bash
npm run start:dev
```

3. **Build de produção**

```bash
npm run build
npm run start:prod
```

---

## 🧪 Testes

O projeto utiliza **Jest** para testes.

- Rodar todos os testes:

```bash
npm test
```

- Rodar testes em modo watch:

```bash
npm run test:watch
```

- Rodar com cobertura:

```bash
npm run test:cov
```

---

## 📂 Estrutura do Projeto

```
.
├── docker-compose.yml   # Orquestração de serviços
├── Dockerfile           # Configuração da imagem da aplicação
├── package.json         # Dependências e scripts
├── .env.example         # Exemplo de variáveis de ambiente
└── src/                 # Código-fonte da aplicação
```
