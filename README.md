# 🍕 Sistema de Pizzaria - Fullstack

Este repositório unificado contém a aplicação completa para o sistema de gerenciamento de Pizzaria, dividida em dois módulos principais: o **Backend** (API) e o **Frontend** (Interface Web).

---

## 🏗️ Estrutura do Repositório

O projeto é estruturado em subpastas independentes para facilitar a manutenção e organização:

*   **[`backend/`]**: API REST desenvolvida em Node.js com Express e TypeScript. É responsável pela lógica de negócios, persistência de dados (PostgreSQL via Prisma ORM), criptografia de senhas, upload de imagens (Cloudinary) e autenticação segura via tokens JWT.
*   **[`frontend/`]**: Aplicação Web SPA criada em Next.js com React 19 e Tailwind CSS v4. Consome a API do backend para realizar autenticações, gerenciar produtos/categorias e controlar os fluxos de pedidos.

---

## 🚀 Módulos e Tecnologias

### 🖥️ Backend (API)
*   **Node.js & TypeScript**: Ambiente moderno e robusto com tipagem estática.
*   **Express**: Framework rápido e minimalista para criação de endpoints REST.
*   **Prisma ORM & PostgreSQL**: Integração de banco de dados robusta e migrações controladas.
*   **JWT & bcryptjs**: Segurança de dados e rotas autenticadas por token com senhas criptografadas.
*   **Cloudinary & Multer**: Envio e armazenamento automático das imagens dos produtos na nuvem.
*   **Zod**: Validação estrita de todos os corpos, queries e parâmetros das requisições.

Para saber mais sobre a documentação de rotas e esquemas Zod do backend, consulte o arquivo local de **[API Endpoints](file:///C:/Users/gui93/OneDrive/Área de Trabalho/next/pizzaria/backend/endpoints.md)**.

### 🎨 Frontend (Painel Web)
*   **Next.js (App Router)**: Framework de React moderno para renderização de interfaces rápidas e rotas amigáveis.
*   **React 19**: Biblioteca padrão para renderização baseada em componentes reativos.
*   **Tailwind CSS v4 & shadcn/ui**: Estilização moderna e componentes desacoplados de alta performance.
*   **TypeScript**: Prevenção de bugs no client-side com tipagem segura.

---

## ⚙️ Como Inicializar o Projeto

Para rodar todo o sistema localmente em ambiente de desenvolvimento, siga as instruções abaixo em terminais separados:

### 1. Inicializando o Backend
Navegue até a pasta do backend:
```bash
cd backend
```

Instale as dependências:
```bash
npm install
```

Configure o arquivo `.env` na raiz do backend baseado no arquivo de exemplo e configure a string de conexão com o PostgreSQL, credenciais do Cloudinary e a chave secreta do JWT.

Execute as migrações do banco de dados (Prisma):
```bash
npx prisma migrate dev
```

Gere o cliente do Prisma:
```bash
npx prisma generate
```

Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
*O servidor estará acessível em `http://localhost:3333`.*

---

### 2. Inicializando o Frontend
Navegue até a pasta do frontend:
```bash
cd ../frontend
```

Instale as dependências:
```bash
npm install
```

Inicie a aplicação Next.js:
```bash
npm run dev
```
*O painel web estará rodando e acessível em `http://localhost:3000`.*
