<div align="center">

# Munik — CRM para Salões de Beleza

**O CRM completo para salões de beleza, clínicas de estética e barbearias.**

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2-3FCF8E?logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
[![Licença: MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-blue.svg)](./LICENSE)

</div>

---

## 📖 Sobre

O **Munik** é um sistema de gestão (CRM) voltado para salões de beleza, clínicas de estética e barbearias. O objetivo é centralizar a operação do estabelecimento — clientes, agenda, catálogo de serviços, controle de estoque e campanhas de reengajamento — em uma única interface web responsiva, com foco em retenção de clientes e no relacionamento via WhatsApp.

A aplicação é uma SPA em **React 18 + TypeScript**, construída com **Vite**, estilizada com **Tailwind CSS** e componentes **shadcn/ui** (base **Radix UI**). A autenticação e a persistência de dados são feitas com **Supabase** (Supabase Auth e PostgreSQL com Row Level Security). O schema do banco está versionado como migração em `supabase/migrations/`, cobrindo as tabelas `profiles`, `clients`, `services`, `appointments`, `service_history` e `products`, todas protegidas por políticas de acesso por usuário.

A interface é totalmente em português (pt-BR) e prioriza o uso diário no salão: dashboard com indicadores, cadastro rápido de clientes em painel lateral, agenda do dia e da semana, alerta de estoque baixo e campanhas prontas de aniversário e reativação de clientes inativos. As telas são atualmente populadas com dados de exemplo, enquanto a camada de persistência está definida no schema Supabase.

## ✨ Funcionalidades

- **Autenticação** com Supabase Auth: cadastro, login por e-mail/senha e logout, com rotas protegidas e redirecionamento automático.
- **Layout responsivo** com barra lateral no desktop e navegação inferior no mobile.
- **Dashboard** com cartões de métricas (clientes ativos, faturamento do mês, agendamentos do dia e clientes sem retorno), gráfico de novos clientes por mês (Recharts), lista de próximos agendamentos e seção de clientes para contatar.
- **Clientes**: busca por nome ou telefone, cadastro em painel lateral (nome, telefone, e-mail, data de nascimento, origem e observações), listagem com status (ativo, em risco, inativo), total gasto e atalho para o WhatsApp.
- **Agendamentos**: visualizações em lista (hoje e amanhã) e por semana, criação de agendamento (cliente, serviço, profissional, data e hora), status (pendente, confirmado, concluído, cancelado) e ação de concluir.
- **Serviços**: cadastro com categoria, duração e preço, indicador de ativo/inativo e ações de editar e excluir com confirmação.
- **Produtos**: controle simples de estoque com marca, categoria, custo e alerta automático de estoque baixo.
- **Campanhas**: lista de aniversariantes do mês e de clientes inativos, com mensagens prontas, envio via WhatsApp e opção de copiar mensagens.
- **Configurações**: dados do salão, perfil do usuário, preferências de notificação e logout.
- **Integração com WhatsApp** via links `wa.me` para contato e reengajamento de clientes.
- **Componentes de UI reutilizáveis** (`MetricCard`, `StatusBadge`, `ClientAvatar`, `EmptyState`, `AppSidebar`) e biblioteca completa de componentes shadcn/ui.
- **Schema Supabase com RLS**: políticas de acesso por usuário em todas as tabelas e trigger de criação automática de perfil no cadastro.
- **Testes** configurados com Vitest + Testing Library e configuração de testes end-to-end com Playwright.

## 🛠️ Tecnologias

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2-3FCF8E?logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Componentes-000000?logo=shadcnui&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-1-161618?logo=radixui&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2-8884D8?logo=react&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-3-6E9F18?logo=vitest&logoColor=white)

## 📁 Estrutura do projeto

```
munik-beauty-hub/
├── public/
├── src/
│   ├── components/            # AppLayout, AppSidebar, MetricCard, StatusBadge, ui/
│   ├── contexts/              # AuthContext (Supabase Auth)
│   ├── hooks/
│   ├── integrations/supabase/ # cliente e tipos gerados do Supabase
│   ├── lib/                   # cliente Supabase e utilitários
│   ├── pages/                 # Dashboard, Clientes, Agendamentos, Serviços,
│   │                          # Produtos, Campanhas, Configurações, Auth
│   ├── test/                  # configuração e testes (Vitest)
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   ├── migrations/            # schema (profiles, clients, services, appointments,
│   │                          # service_history, products) com RLS
│   └── config.toml
├── index.html
├── tailwind.config.ts
├── vite.config.ts
├── playwright.config.ts
├── vitest.config.ts
└── package.json
```

## 🚀 Como rodar localmente

```bash
# Instalar dependências (npm ou bun)
npm install          # ou: bun install

# Ambiente de desenvolvimento (Vite, porta 8080)
npm run dev

# Build de produção
npm run build

# Pré-visualizar o build
npm run preview

# Executar os testes
npm run test

# Lint
npm run lint
```

O servidor de desenvolvimento do Vite inicia em `http://localhost:8080/`.

## 🔐 Variáveis de ambiente

As variáveis abaixo são usadas pelo cliente para conectar ao Supabase. Crie um arquivo `.env` na raiz do projeto com esses valores.

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

## 📄 Licença

Distribuído sob a **Licença MIT**. Veja [`LICENSE`](./LICENSE).
