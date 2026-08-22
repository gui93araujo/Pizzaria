# Pizzaria API - Backend

Este é o início do projeto de API para o sistema de Pizzaria. Desenvolvido com Node.js, Express e TypeScript, o projeto conta com validação robusta de esquemas de dados utilizando Zod.

## 🚀 Tecnologias Utilizadas

O backend do projeto utiliza as seguintes tecnologias e bibliotecas:

- **Node.js** com **TypeScript** para um ambiente robusto e tipagem estática.
- **Express** como framework web para rotas e requisições HTTP.
- **Prisma ORM** para mapeamento objeto-relacional e integração moderna com o banco de dados.
- **PostgreSQL (pg)** como banco de dados relacional e driver de conexão.
- **JSON Web Token (JWT)** para geração de tokens de autenticação e proteção de rotas.
- **bcryptjs** para criptografia segura de senhas.
- **Cloudinary** para upload e hospedagem de imagens na nuvem.
- **Multer** para upload de arquivos via Multipart Form-Data (utilizando memoryStorage).
- **Zod** para validação de dados de entrada de forma declarativa e segura.
- **tsx** para execução do servidor em modo de desenvolvimento com hot-reload rápido.
- **dotenv** para gerenciamento de variáveis de ambiente.
- **CORS** para habilitar acessos externos à API de forma controlada.

## 📂 Estrutura de Pastas

```text
backend/
├── prisma/
│   ├── migrations/      # Histórico de migrações do banco de dados
│   └── schema.prisma    # Esquema de banco de dados e modelos do Prisma
├── src/
│   ├── config/          # Configurações gerais (banco de dados, etc.)
│   ├── controllers/     # Controladores das rotas (lógica de requisição/resposta)
│   ├── middlewares/     # Middlewares (validação, autenticação, etc.)
│   ├── prisma/          # Instanciação do Prisma Client com adapter do PostgreSQL
│   ├── schemas/         # Esquemas de validação de dados com Zod
│   ├── services/        # Regras de negócio e serviços da aplicação
│   ├── routes.ts        # Definição das rotas da API
│   └── server.ts        # Ponto de entrada (inicialização do Express)
├── prisma.config.ts     # Arquivo de configuração do Prisma
├── tsconfig.json        # Configuração do TypeScript
└── package.json         # Dependências e scripts do projeto
```

## 🛠️ Como Executar o Projeto

1. **Instalar Dependências**:
   ```bash
   npm install
   ```

2. **Configurar Variáveis de Ambiente**:
   Crie um arquivo `.env` na raiz do diretório `backend` (ou copie e ajuste se houver um `.env.example`).
   Adicione a porta, a URL de conexão do PostgreSQL, a chave secreta do JWT e as chaves do Cloudinary:
   ```env
   PORT=3333
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_banco?schema=public"
   JWT_SECRET="sua_chave_secreta_aqui"
   CLOUDINARY_CLOUD_NAME="seu_cloud_name"
   CLOUDINARY_API_KEY="sua_api_key"
   CLOUDINARY_API_SECRET="seu_api_secret"
   ```

3. **Executar as Migrações do Banco de Dados**:
   Crie as tabelas no banco de dados e aplique as migrações com:
   ```bash
   npx prisma migrate dev
   ```

4. **Gerar o Cliente do Prisma**:
   Gere o client localmente (para a pasta configurada `src/generated/prisma`):
   ```bash
   npx prisma generate
   ```

5. **Iniciar em modo de Desenvolvimento**:
   ```bash
   npm run dev
   ```
   O servidor iniciará por padrão na porta `3333` (ou na definida no seu `.env`), com log exibido no console: `Servidor iniciado na porta 3333`.

## 📌 Rotas da API

### Usuários

* **`POST /users`**
  - Criação de um novo usuário (com senha criptografada via bcryptjs).
  - **Validação com Zod**: Verifica se os dados enviados no corpo da requisição condizem com o esquema `createUserSchema` definido em `src/schemas/userSchema.ts`.

* **`POST /session`**
  - Autenticação/login do usuário.
  - **Validação com Zod**: Verifica se os dados condizem com o esquema `authUserSchema` definido em `src/schemas/userSchema.ts`.
  - **Retorno**: Retorna as informações do usuário logado e o token JWT para autorização nas requisições.

* **`GET /me`**
  - Retorna os detalhes do usuário atualmente autenticado.
  - **Requisito**: Requer o token JWT enviado no cabeçalho `Authorization` como `Bearer <token>`.
  - **Retorno**: Informações básicas do usuário logado (`id`, `name`, `email`, `role`, `createdAt`).

### Categorias

* **`GET /category`**
  - Lista todas as categorias cadastradas, ordenadas por nome (Z-A).
  - **Requisito**: Requer o token JWT enviado no cabeçalho `Authorization` como `Bearer <token>`.
  - **Retorno**: Um array com as categorias (`[{ id, name, createdAt }]`).

* **`POST /category`**
  - Criação de uma nova categoria de produto.
  - **Requisito**: Requer o token JWT enviado no cabeçalho `Authorization` como `Bearer <token>` e que o usuário possua a role `ADMIN`.
  - **Validação com Zod**: Verifica se os dados enviados no corpo da requisição condizem com o esquema `createCategorySchema` em `src/schemas/categorySchema.ts`.
  - **Retorno**: Detalhes da categoria criada (`id`, `name`, `createdAt`).

### Produtos

* **`GET /products`**
  - Lista todos os produtos cadastrados, ordenados de forma decrescente por nome (Z-A).
  - **Requisito**: Requer o token JWT enviado no cabeçalho `Authorization` como `Bearer <token>`.
  - **Validação com Zod**: Aceita opcionalmente na query param o campo `disabled` (como string `"true"` ou `"false"`) para filtrar os produtos.
  - **Retorno**: Um array com os produtos e seus respectivos detalhes, incluindo as informações da categoria associada (`[{ id, name, price, description, banner, disabled, category_id, createdAt, category: { id, name } }]`).

* **`POST /product`**
  - Cadastro de um novo produto (incluindo upload da imagem do banner).
  - **Requisito**: Requer o token JWT enviado no cabeçalho `Authorization` como `Bearer <token>` e que o usuário possua a role `ADMIN`.
  - **Tipo de Requisição**: `Multipart Form-Data` contendo os campos: `name`, `price`, `description`, `category_id` e o arquivo de imagem no campo `file`.
  - **Retorno**: Detalhes do produto criado (`id`, `name`, `price`, `description`, `banner`, `category_id`, `createdAt`).





