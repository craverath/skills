# Global Rules — Non-Dev Guided Development

Regras transversais para o fluxo guiado. Valem em todos os passos
(`brainstorming`, `writing-plans`, `test-driven-development`,
`requesting-code-review`, `finishing-a-development-branch`).

## Technology stack (obrigatória)

Apenas duas linguagens são permitidas: **TypeScript** ou **Python**. Nada mais.
Em todos os casos, **sempre tipado** e **sempre testado** — não é opcional.

Escolha a stack pelo *que está sendo construído*, não por preferência:

- **Site ou app que abre no navegador** (páginas, dashboards, áreas de login,
  lojas) → **Next.js + TypeScript**.
- **Script, automação ou ferramenta de linha de comando** (processar
  arquivos/dados, integrar serviços, jobs agendados) → **Python**.
- **App desktop com janela/GUI** → **Python ou Electron** (ver critério de
  desempate).

Se uma ideia abrange mais de um tipo, divida e aplique a regra por parte
(ex.: um site *e* um script de importação → Next.js para o site, Python para o
script).

Ferramentas fixas por stack (sem bikeshedding por projeto):

- **Web (Next.js + TS):** TypeScript estrito (sem `any`), Next.js App Router,
  pnpm, Vitest + Playwright, ESLint + Prettier.
- **Python:** type hints completos, uv, pyright (strict), pytest,
  ruff (lint + format).
- **Electron:** TypeScript estrito, pnpm, renderer em React, Vitest + Playwright,
  ESLint + Prettier.
- **Python desktop GUI:** ferramentas de Python acima + PySide6.

Critério de desempate desktop (Python vs Electron) — recomende um e explique:

- Prefira **Electron** para UIs ricas/web-like, quando reaproveitar skills ou
  código web (Next.js), ou quando um instalador cross-platform polido importa.
- Prefira **Python** quando o programa é majoritariamente processamento de
  dados/arquivos, integra muito com o SO/hardware/ferramentas locais, ou a UI é
  simples e um footprint leve importa.

## Security (obrigatória)

Segurança é o padrão, não um recurso para adicionar depois. Construa seguro
desde o primeiro passo.

Sempre (toda stack):

- **Segredos fora do código.** Nunca hardcode, log, print ou commit de chaves,
  tokens, senhas ou strings de conexão. Use variáveis de ambiente / secrets
  manager; mantenha `.env` no gitignore e entregue um `.env.example` com valores
  vazios.
- **Nunca confie no input.** Valide e sanitize tudo que vem de fora (campos de
  formulário, query params, request bodies, arquivos, args de CLI) na fronteira,
  com um schema (`zod` em TS, `pydantic` em Python). Rejeite o que não bater.
- **Sem injeção.** Use queries parametrizadas / um ORM — nunca monte SQL ou
  comandos shell por concatenação de string. Evite `eval`/`exec`; evite
  `shell=True` e `pickle` sobre dados não confiáveis em Python.
- **Menor privilégio.** Peça o mínimo de permissões, escopos e grants de DB.
- **Dependências.** Use lockfiles, prefira pacotes mantidos e audite com
  frequência (`pnpm audit` / `pip-audit`). Veja a skill `npm-security`.
- **Erros e logs.** Mostre erros genéricos ao usuário; nunca vaze stack traces,
  segredos ou PII em logs ou respostas.
- **Transporte.** Apenas HTTPS; defaults seguros ligados.

Web (Next.js):

- Use uma biblioteca de auth confiável — nunca implemente seu próprio
  session/crypto.
- Imponha **autorização no servidor** para toda ação protegida; esconder UI não
  é controle de acesso. Valide o input de novo em Server Actions / API routes.
- Cookies `httpOnly` + `secure` + `sameSite`; proteja mutações contra CSRF.
- Confie no escaping do React; evite `dangerouslySetInnerHTML`. Defina uma
  Content Security Policy. Segredos só no servidor — nunca em `NEXT_PUBLIC_*`.

Python:

- Valide com `pydantic`; parametrize todo acesso a DB.
- Proteja contra path traversal ao lidar com caminhos de arquivo; nunca rode
  input não confiável via `subprocess` com `shell=True`.

Electron:

- `contextIsolation: true`, `nodeIntegration: false`, `sandbox: true`; nunca
  desabilite `webSecurity`.
- Exponha uma API mínima e validada via `contextBridge`; valide cada mensagem
  IPC.
- Carregue apenas conteúdo local confiável, defina uma CSP e nunca execute
  código remoto.

Quando o desenho toca autenticação, pagamentos, dados pessoais ou upload de
arquivos, marque como sensível à segurança em `brainstorming`, adicione tarefas
de segurança explícitas em `writing-plans` e dê uma passada dedicada em
`requesting-code-review`.

## Code style

- Tipos explícitos. Sem `any`, sem `Dict`, sem funções não tipadas.

## Tests

- Os testes rodam com um único comando.
- Toda função nova ganha um teste. Correção de bug ganha um teste de regressão.
- Mocke I/O externo (API, DB, filesystem) com fake classes nomeadas, não stubs
  inline.
- Testes seguem F.I.R.S.T: fast, independent, repeatable, self-validating,
  timely.

## Structure

- Siga a convenção do framework (Rails, Django, Next.js, etc.).
- Prefira módulos pequenos e focados a god files.
- Caminhos previsíveis: controller/model/view, src/lib/test, etc.
- Nunca print, log, exponha ou commit de segredos.
