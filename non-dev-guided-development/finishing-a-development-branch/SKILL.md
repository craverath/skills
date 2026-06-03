---
name: finishing-a-development-branch
description: Final step of the guided flow for non-developers. Use when the work is built, reviewed, and all tests pass. Verifies tests, then presents clear delivery options and never finalizes (commit/merge/push) without explicit user confirmation.
user-invocable: true
allowed-tools:
  - Read
  - Bash
---

# Finishing a Development Branch — Entregar

Última etapa do fluxo: finalizar o trabalho de forma segura. O agente confirma que
está tudo funcionando e te apresenta opções claras de como entregar. Você decide.

**Avise ao começar:** "Estou finalizando o trabalho: vou conferir os testes e te
apresentar as opções de entrega."

## Regra de segurança (vale sempre)

O agente **nunca** finaliza sozinho. Salvar o trabalho oficialmente (commit), enviá-lo
(push) ou juntá-lo ao projeto principal (merge) só acontece **depois da sua confirmação
explícita**. Veja as regras globais em `../global-rules/AGENTS.md`.

## Passos

### 1. Conferir os testes

Antes de qualquer coisa, o agente roda todos os testes do projeto.

- **Se algum teste falhar:** ele te mostra o que falhou e **para aqui**. Não dá para
  entregar com teste quebrado — primeiro conserta (voltando ao ciclo de testes).
- **Se tudo passar:** segue para apresentar as opções.

### 2. Apresentar as opções

O agente te apresenta opções claras, em linguagem simples, por exemplo:

```
Trabalho pronto e testes passando. O que você quer fazer?

1. Juntar ao projeto principal
2. Enviar e abrir um pedido de revisão (Pull Request)
3. Deixar como está (eu cuido disso depois)
4. Descartar este trabalho

Qual opção?
```

### 3. Executar a sua escolha

- O agente só executa a opção que você escolher, e confirma o resultado.
- Para **descartar** (opção 4), ele pede uma confirmação digitada (você escreve
  `descartar`) antes de apagar qualquer coisa, porque essa ação não tem volta.
- Para qualquer ação que salve, envie ou junte o trabalho, ele confirma com você antes.

## Nunca

- Seguir com testes falhando.
- Apagar trabalho sem confirmação explícita.
- Salvar, enviar ou juntar o trabalho sem você pedir.

Concluída a entrega, o fluxo está completo. Para uma próxima ideia, recomece pela
skill `brainstorming`.
