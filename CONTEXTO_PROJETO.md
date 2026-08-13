# Contexto do Projeto — Pizzaria API (Backend)

Documento de referência com as especificações técnicas, arquitetura, endpoints, modelagem de dados e convenções adotadas no backend do sistema de pizzaria.

---

## Visão Geral

API REST para gerenciamento de uma pizzaria, desenvolvida com **Node.js**, **Express 5**, **TypeScript** e **Prisma ORM 7** conectado a **PostgreSQL**. O sistema cobre autenticação de usuários, controle de permissões por role e cadastro de categorias (com produtos, pedidos e itens já modelados no banco, aguardando implementação de rotas).

---

## Arquitetura

O projeto segue uma arquitetura em camadas com separação clara de responsabilidades:

```
Requisição HTTP
      ↓
   Rotas (routes.ts)
      ↓
   Middlewares (validação, autenticação, autorização)
      ↓
   Controller (recebe req/res, extrai dados, delega ao Service)
      ↓
   Service (regras de negócio, acesso ao banco via Prisma)
      ↓
   Prisma Client → PostgreSQL
      ↓
   Service retorna resultado
      ↓
   Controller formata e envia resposta JSON
```

### Fluxo por camada

| Camada | Responsabilidade |
|--------|------------------|
| **Rotas** | Define métodos HTTP, paths e encadeia middlewares + controller |
| **Middlewares** | Validação de schema (Zod), autenticação JWT, verificação de role admin |
| **Controllers** | Recebe a requisição, extrai `body`/`params`/`query`, instancia o Service e retorna `res.json()` |
| **Services** | Contém a lógica de negócio, consultas Prisma, hash de senha, geração de JWT e tratamento de erros |
| **Prisma** | Cliente ORM com adapter PostgreSQL (`@prisma/adapter-pg`) |

### Padrões adotados

- Controllers expõem um método `handle(req, res)`.
- Services expõem um método `execute(...)` com interface tipada para os parâmetros.
- Erros de negócio são lançados com `throw new Error(...)` e capturados pelo middleware global de erro em `server.ts` (status 400).
- Senhas nunca são retornadas nas respostas; o `select` do Prisma exclui o campo `password`.

---

## Organização de Pastas

```text
backend/
├── prisma/
│   ├── migrations/              # Histórico de migrações SQL
│   │   └── 20260809183725_create_tables/
│   └── schema.prisma            # Modelos, enums e relações do banco
├── src/
│   ├── @types/
│   │   └── express/
│   │       └── index.d.ts       # Extensão do Request do Express (req.id)
│   ├── controllers/
│   │   ├── category/
│   │   │   └── CreateCategoryController.ts
│   │   └── user/
│   │       ├── AuthUserController.ts
│   │       ├── createUserController.ts
│   │       └── DetailUserController.ts
│   ├── generated/
│   │   └── prisma/              # Cliente Prisma gerado (npx prisma generate)
│   ├── middlewares/
│   │   ├── isAdmin.ts           # Verifica role ADMIN
│   │   ├── isAuthenticated.ts   # Valida JWT e injeta req.id
│   │   └── validateSchema.ts    # Valida body/query/params com Zod
│   ├── prisma/
│   │   └── index.ts             # Instância singleton do PrismaClient
│   ├── schemas/
│   │   ├── categorySchema.ts    # Schemas Zod de categoria
│   │   └── userSchema.ts        # Schemas Zod de usuário
│   ├── services/
│   │   ├── category/
│   │   │   └── CreateCategoryService.ts
│   │   └── user/
│   │       ├── AuthUserService.ts
│   │       ├── createUserService.ts
│   │       └── DetailUserService.ts
│   ├── routes.ts                # Definição centralizada de rotas
│   └── server.ts                # Bootstrap Express, CORS, error handler
├── prisma.config.ts             # Configuração Prisma 7 (datasource, migrations)
├── tsconfig.json
├── package.json
└── CONTEXTO_PROJETO.md          # Este documento
```

### Convenção de nomenclatura

- **Controllers/Services de usuário**: mix de `PascalCase` (`AuthUserController`) e `camelCase` (`createUserController`) — padronizar conforme novos módulos forem criados.
- **Schemas**: `{acao}{Entidade}Schema` (ex.: `createUserSchema`, `authUserSchema`).
- **Middlewares**: funções nomeadas por comportamento (`isAuthenticated`, `isAdmin`, `validateSchema`).

---

## Versões das Bibliotecas

### Dependências de produção

| Biblioteca | Versão | Uso |
|------------|--------|-----|
| `express` | ^5.2.1 | Framework HTTP |
| `@prisma/client` | ^7.9.1 | ORM — cliente gerado |
| `@prisma/adapter-pg` | ^7.9.1 | Driver adapter PostgreSQL (Prisma 7) |
| `pg` | ^8.23.0 | Driver nativo PostgreSQL |
| `zod` | ^4.4.3 | Validação de schemas |
| `jsonwebtoken` | ^9.0.3 | Autenticação JWT |
| `bcryptjs` | ^3.0.3 | Hash de senhas (salt rounds: 8) |
| `cors` | ^2.8.6 | Cross-Origin Resource Sharing |
| `dotenv` | ^17.4.2 | Variáveis de ambiente |
| `tsx` | ^4.23.8 | Execução TypeScript em dev (watch) |

### Dependências de desenvolvimento

| Biblioteca | Versão | Uso |
|------------|--------|-----|
| `typescript` | ^7.0.2 | Compilador TS |
| `prisma` | ^7.9.1 | CLI migrations/generate |
| `@types/express` | ^5.0.6 | Tipos Express |
| `@types/node` | ^26.2.0 | Tipos Node.js |
| `@types/cors` | ^2.8.19 | Tipos CORS |
| `@types/jsonwebtoken` | ^9.0.10 | Tipos JWT |
| `@types/pg` | ^8.21.0 | Tipos pg |

### Runtime e configuração

| Item | Valor |
|------|-------|
| Node module system | CommonJS (`"type": "commonjs"`) |
| TypeScript target | ES2020 |
| Module resolution | NodeNext |
| Strict mode | Ativado |
| Porta padrão | 3333 |
| Script dev | `tsx watch src/server.ts` |

---

## Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `PORT` | Não | Porta do servidor (padrão: 3333) |
| `DATABASE_URL` | Sim | Connection string PostgreSQL |
| `JWT_SECRET` | Sim | Chave secreta para assinatura/verificação de tokens |

Exemplo `.env`:

```env
PORT=3333
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_banco?schema=public"
JWT_SECRET="sua_chave_secreta_aqui"
```

---

## Modelagem do Banco de Dados

**Provider:** PostgreSQL  
**ORM:** Prisma 7 com client gerado em `src/generated/prisma`  
**Migrations:** `prisma/migrations/`

### Diagrama de relações

```mermaid
erDiagram
    User ||--o{ : "sem relação direta ainda"
    Category ||--o{ Product : "category_id"
    Product ||--o{ Item : "product_id"
    Order ||--o{ Item : "order_id"

    User {
        uuid id PK
        string name
        string email UK
        string password
        enum role
        datetime createdAt
        datetime updatedAt
    }

    Category {
        uuid id PK
        string name
        datetime createdAt
        datetime updatedAt
    }

    Product {
        uuid id PK
        string name
        int price
        string description
        string banner
        boolean disabled
        uuid category_id FK
        datetime createdAt
        datetime updatedAt
    }

    Order {
        uuid id PK
        int table
        boolean status
        boolean draft
        string name
        datetime createdAt
        datetime updatedAt
    }

    Item {
        uuid id PK
        int amount
        uuid order_id FK
        uuid product_id FK
        datetime createdAt
        datetime updatedAt
    }
```

### Enum `Role`

| Valor | Descrição |
|-------|-----------|
| `STAFF` | Funcionário padrão (default ao criar usuário) |
| `ADMIN` | Administrador — acesso a rotas protegidas como criação de categoria |

### Tabela `users`

| Campo | Tipo | Constraints |
|-------|------|-------------|
| `id` | TEXT (UUID) | PK |
| `name` | TEXT | NOT NULL |
| `email` | TEXT | NOT NULL, UNIQUE |
| `password` | TEXT | NOT NULL (hash bcrypt) |
| `role` | Role | NOT NULL, DEFAULT `STAFF` |
| `createdAt` | TIMESTAMP | DEFAULT now() |
| `updatedAt` | TIMESTAMP | Auto-update |

### Tabela `categories`

| Campo | Tipo | Constraints |
|-------|------|-------------|
| `id` | TEXT (UUID) | PK |
| `name` | TEXT | NOT NULL |
| `createdAt` | TIMESTAMP | DEFAULT now() |
| `updatedAt` | TIMESTAMP | Auto-update |

### Tabela `products`

| Campo | Tipo | Constraints |
|-------|------|-------------|
| `id` | TEXT (UUID) | PK |
| `name` | TEXT | NOT NULL |
| `price` | INTEGER | NOT NULL (centavos) |
| `description` | TEXT | NOT NULL |
| `banner` | TEXT | NOT NULL (URL/imagem) |
| `disabled` | BOOLEAN | DEFAULT false |
| `category_id` | TEXT | FK → categories, ON DELETE CASCADE |
| `createdAt` | TIMESTAMP | DEFAULT now() |
| `updatedAt` | TIMESTAMP | Auto-update |

### Tabela `orders`

| Campo | Tipo | Constraints |
|-------|------|-------------|
| `id` | TEXT (UUID) | PK |
| `table` | INTEGER | NOT NULL (número da mesa) |
| `status` | BOOLEAN | DEFAULT false — `false` = pendente, `true` = pronto |
| `draft` | BOOLEAN | DEFAULT false — `false` = rascunho, `true` = enviado à cozinha |
| `name` | TEXT | NULL (nome opcional do pedido) |
| `createdAt` | TIMESTAMP | DEFAULT now() |
| `updatedAt` | TIMESTAMP | Auto-update |

### Tabela `items`

| Campo | Tipo | Constraints |
|-------|------|-------------|
| `id` | TEXT (UUID) | PK |
| `amount` | INTEGER | NOT NULL (quantidade) |
| `order_id` | TEXT | FK → orders, ON DELETE CASCADE |
| `product_id` | TEXT | FK → products, ON DELETE CASCADE |
| `createdAt` | TIMESTAMP | DEFAULT now() |
| `updatedAt` | TIMESTAMP | Auto-update |

### Comandos Prisma úteis

```bash
npx prisma migrate dev    # Criar/aplicar migrations
npx prisma generate       # Gerar client em src/generated/prisma
npx prisma studio         # Interface visual do banco
```

---

## Validação com Zod

A validação é feita via middleware genérico `validateSchema`, que valida `body`, `query` e `params` de uma vez.

### Middleware `validateSchema`

- Recebe um `ZodType` como parâmetro.
- Em sucesso: chama `next()`.
- Em `ZodError`: retorna **400** com `{ error: "Erro de validação", details: [{ message }] }`.
- Outros erros: retorna **500**.

### Schemas de usuário (`src/schemas/userSchema.ts`)

#### `createUserSchema` — POST `/users`

| Campo | Regras |
|-------|--------|
| `body.name` | string, mínimo 3 caracteres |
| `body.email` | email válido |
| `body.password` | string, mínimo 6 caracteres |

#### `authUserSchema` — POST `/session`

| Campo | Regras |
|-------|--------|
| `body.email` | email válido |
| `body.password` | string, mínimo 6 caracteres |

### Schemas de categoria (`src/schemas/categorySchema.ts`)

#### `createCategorySchema` — POST `/category`

| Campo | Regras |
|-------|--------|
| `body.name` | string, mínimo 2 caracteres |

---

## Middlewares

### `validateSchema(schema)`

| Item | Detalhe |
|------|---------|
| **Arquivo** | `src/middlewares/validateSchema.ts` |
| **Função** | Valida entrada da requisição com Zod antes de chegar ao controller |
| **Usado em** | POST `/users`, POST `/session`, POST `/category` |

### `isAuthenticated`

| Item | Detalhe |
|------|---------|
| **Arquivo** | `src/middlewares/isAuthenticated.ts` |
| **Função** | Lê header `Authorization: Bearer <token>`, valida JWT com `JWT_SECRET`, extrai `sub` (user id) e define `req.id` |
| **Erros** | 401 — "Token não informado" ou "Token inválido" |
| **Usado em** | GET `/me`, POST `/category` |

### `isAdmin`

| Item | Detalhe |
|------|---------|
| **Arquivo** | `src/middlewares/isAdmin.ts` |
| **Função** | Busca usuário por `req.id` no banco e verifica se `role === "ADMIN"` |
| **Pré-requisito** | Deve rodar após `isAuthenticated` |
| **Erros** | 401 — "Usuário sem permissão" |
| **Usado em** | POST `/category` |

### Middleware global de erro (`server.ts`)

- Captura erros lançados nos services (`throw new Error(...)`).
- Retorna **400** com `{ error: error.message }`.
- Erros não identificados: **500** — `{ status: "error", message: "Internal Server Error" }`.

---

## Endpoints

Base URL: `http://localhost:3333` (ou valor de `PORT`)

### Health check

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| GET | `/` | Não | Retorna texto `"API funcionando"` |

---

### Usuários

#### `POST /users` — Criar usuário

| Item | Detalhe |
|------|---------|
| **Auth** | Não |
| **Middlewares** | `validateSchema(createUserSchema)` |
| **Body** | `{ name, email, password }` |
| **Service** | `CreateUserService` — verifica email duplicado, hash bcrypt (8 rounds), cria usuário com role `STAFF` |
| **Resposta 200** | `{ id, name, email, role, createdAt }` |
| **Erros** | 400 — "Usuário já existente!" |

#### `POST /session` — Login / autenticação

| Item | Detalhe |
|------|---------|
| **Auth** | Não |
| **Middlewares** | `validateSchema(authUserSchema)` |
| **Body** | `{ email, password }` |
| **Service** | `AuthUserService` — valida credenciais, gera JWT (expira em 30 dias, `subject` = user id) |
| **Resposta 200** | `{ id, name, email, role, token }` |
| **Erros** | 400 — "Usuário ou senha incorreto!" |

#### `GET /me` — Detalhes do usuário logado

| Item | Detalhe |
|------|---------|
| **Auth** | Sim — `Authorization: Bearer <token>` |
| **Middlewares** | `isAuthenticated` |
| **Service** | `DetailUserService` — busca por `req.id` |
| **Resposta 200** | `{ id, name, email, role, createdAt }` |
| **Erros** | 401 — token inválido/ausente; 400 — "Usuário não encontrado" |

---

### Categorias

#### `POST /category` — Criar categoria

| Item | Detalhe |
|------|---------|
| **Auth** | Sim — Bearer token |
| **Middlewares** | `isAuthenticated` → `isAdmin` → `validateSchema(createCategorySchema)` |
| **Body** | `{ name }` |
| **Service** | `CreateCategoryService` — persiste categoria no banco |
| **Resposta 200** | `{ id, name, createdAt }` |
| **Erros** | 401 — sem token ou sem permissão admin; 400 — "Erro ao criar categoria" |

---

## Autenticação e Autorização

### Fluxo de login

1. Cliente envia `POST /session` com email e senha.
2. Service compara senha com hash bcrypt.
3. JWT é gerado com payload `{ name, email }`, `subject` = id do usuário, expiração 30 dias.
4. Cliente armazena o token e envia em requisições protegidas.

### Fluxo de rotas protegidas

1. Header: `Authorization: Bearer <token>`.
2. `isAuthenticated` decodifica o token e define `req.id`.
3. (Opcional) `isAdmin` consulta o banco e valida role.
4. Controller executa com o contexto do usuário autenticado.

### Extensão de tipos Express

```typescript
// src/@types/express/index.d.ts
declare namespace Express {
  export interface Request {
    id: string; // ID do usuário autenticado (JWT sub)
  }
}
```

---

## Entidades modeladas vs. implementadas

| Entidade | Modelo Prisma | Rotas implementadas |
|----------|---------------|---------------------|
| User | Sim | POST `/users`, POST `/session`, GET `/me` |
| Category | Sim | POST `/category` |
| Product | Sim | Não |
| Order | Sim | Não |
| Item | Sim | Não |

---

## Tratamento de erros — resumo

| Situação | Status | Formato |
|----------|--------|---------|
| Validação Zod | 400 | `{ error: "Erro de validação", details: [...] }` |
| Erro de negócio (throw Error) | 400 | `{ error: "mensagem" }` |
| Token ausente/inválido | 401 | `{ error: "Token não informado" \| "Token inválido" }` |
| Sem permissão admin | 401 | `{ error: "Usuário sem permissão" }` |
| Erro interno não tratado | 500 | `{ status: "error", message: "Internal Server Error" }` |

---

## Como executar

```bash
npm install
npx prisma migrate dev
npx prisma generate
npm run dev
```

Servidor disponível em `http://localhost:3333`.
