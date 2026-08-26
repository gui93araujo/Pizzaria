# Pizzaria Web - Frontend

Este é o módulo de interface web do sistema de Pizzaria. Desenvolvido utilizando as tecnologias mais modernas de desenvolvimento web (Next.js 16, React 19, Tailwind CSS v4 e shadcn/ui), o painel fornece controle administrativo completo para funcionários e gerentes.

---

## 🚀 Tecnologias Utilizadas

O frontend do projeto utiliza as seguintes tecnologias e bibliotecas:

*   **Next.js (App Router)**: Framework React para produção, fornecendo carregamento otimizado de rotas e performance de ponta.
*   **React 19**: Biblioteca padrão para componentização e gerenciamento de estados.
*   **Tailwind CSS v4**: Versão mais recente do utilitário CSS para design consistente, rápido e de alta performance.
*   **shadcn/ui**: Componentes de interface desacoplados, acessíveis e altamente customizáveis para construção rápida da UI.
*   **Lucide React**: Biblioteca de ícones moderna e leve para React.
*   **Base UI**: Biblioteca de componentes funcionais "headless" focada em acessibilidade avançada.
*   **TypeScript**: Tipagem estática segura no client-side para prevenção precoce de erros.

---

## 📂 Estrutura de Pastas

```text
frontend/
├── public/              # Arquivos públicos estáticos (imagens, svgs, favicon)
├── src/
│   ├── app/             # Estrutura do App Router do Next.js
│   │   ├── login/       # Rota e componentes de Login (/login)
│   │   ├── register/    # Rota e componentes de Registro (/register)
│   │   ├── layout.tsx   # Layout global (metadados e provedores)
│   │   ├── globals.css  # Folha de estilo global e variáveis de cores OKLCH
│   │   └── page.tsx     # Ponto de entrada (redireciona para o login)
│   ├── components/      # Componentes reutilizáveis do projeto
│   │   ├── forms/       # Formulários de negócio (ex: register-form.tsx)
│   │   └── ui/          # Componentes visuais primários (card, button, input...)
│   └── lib/             # Módulos utilitários compartilhados
│       └── utils.ts     # Funções auxiliares de estilização (cn)
├── components.json      # Configuração dos componentes da biblioteca shadcn
├── endpoints.md         # Cópia local de documentação dos endpoints para consulta rápida
├── tsconfig.json        # Configuração do compilador TypeScript
├── tailwind.config.ts   # Configuração do tema e extensões do Tailwind
└── package.json         # Dependências e scripts do projeto
```

---

## 🛠️ Como Executar o Projeto

1.  **Instalar Dependências**:
    Navegue até a pasta do frontend e execute:
    ```bash
    npm install
    ```

2.  **Verificar Compilação**:
    Execute o verificador do TypeScript para garantir consistência de tipos:
    ```bash
    npx tsc --noEmit
    ```

3.  **Iniciar Servidor de Desenvolvimento**:
    Inicie a aplicação local com hot-reload ativo:
    ```bash
    npm run dev
    ```
    *O painel web estará rodando e acessível em `http://localhost:3000`.*

---

## 📝 Regras de Design e Cores do Sistema

O projeto adota uma paleta de cores escura personalizada configurada com a especificação OKLCH em [`globals.css`](file:///C:/Users/gui93/OneDrive/Área de Trabalho/next/pizzaria/frontend/src/app/globals.css):

*   **Fundo Geral**: `var(--color-app-background)` (tom escuro balanceado).
*   **Fundo de Cards**: `var(--color-app-card)` (tom escuro elevado para contraste de relevo).
*   **Bordas e Inputs**: `var(--color-app-border)` (tom sutil para divisórias sem poluir a tela).
*   **Acessibilidade**: Todos os campos de formulário estão semanticamente associados a Labels corretos (com `htmlFor` e `id` idênticos) garantindo suporte a leitores de tela e usabilidade.
