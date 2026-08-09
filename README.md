# Pizzaria API - Backend

Este é o início do projeto de API para o sistema de Pizzaria. Desenvolvido com Node.js, Express e TypeScript, o projeto conta com validação robusta de esquemas de dados utilizando Zod.

## 🚀 Tecnologias Utilizadas

O backend do projeto utiliza as seguintes tecnologias e bibliotecas:

- **Node.js** com **TypeScript** para um ambiente robusto e tipagem estática.
- **Express** como framework web para rotas e requisições HTTP.
- **Zod** para validação de dados de entrada de forma declarativa e segura.
- **tsx** para execução do servidor em modo de desenvolvimento com hot-reload rápido.
- **dotenv** para gerenciamento de variáveis de ambiente.
- **CORS** para habilitar acessos externos à API de forma controlada.

## 📂 Estrutura de Pastas

```text
backend/
├── src/
│   ├── config/          # Configurações gerais (banco de dados, etc.)
│   ├── controllers/     # Controladores das rotas (lógica de requisição/resposta)
│   ├── middlewares/     # Middlewares (validação, autenticação, etc.)
│   ├── schemas/         # Esquemas de validação de dados com Zod
│   ├── services/        # Regras de negócio e serviços da aplicação
│   ├── routes.ts        # Definição das rotas da API
│   └── server.ts        # Ponto de entrada (inicialização do Express)
├── tsconfig.json        # Configuração do TypeScript
└── package.json         # Dependências e scripts do projeto
```

## 🛠️ Como Executar o Projeto

1. **Instalar Dependências**:
   ```bash
   npm install
   ```

2. **Configurar Variáveis de Ambiente**:
   Crie um arquivo `.env` na raiz do diretório `backend` (utilize o `.env.example` se disponível ou defina a variável `PORT`). Exemplo:
   ```env
   PORT=3333
   ```

3. **Iniciar em modo de Desenvolvimento**:
   ```bash
   npm run dev
   ```
   O servidor iniciará por padrão na porta `3333` (ou na definida no seu `.env`), com log exibido no console: `Servidor iniciado na porta 3333`.

## 📌 Rotas da API

### Usuários

* **`POST /users`**
  - Criação de um novo usuário.
  - **Validação com Zod**: Verifica se os dados enviados no corpo da requisição condizem com o esquema definido em `src/schemas/userSchema.ts`.
