---
name: requesting-code-review
description: Fourth step of the guided flow for non-developers. Use after building a feature and before finishing. Runs an independent review of the work to catch problems, classified by severity, and decides what must be fixed before delivering.
user-invocable: true
allowed-tools:
  - Read
  - Bash
---

# Requesting Code Review — Revisar o trabalho

Antes de dar o trabalho por pronto, peça uma **revisão independente**. A ideia é
ter um segundo olhar — focado só no que foi construído — para pegar problemas antes
que eles cresçam. Você não precisa entender o código; o agente revisa e te traz o
resultado em linguagem simples.

**Princípio central:** Revise cedo, revise com frequência.

## Quando revisar

**Sempre:**
- depois de terminar uma funcionalidade importante;
- antes de entregar/finalizar o trabalho.

**Também ajuda:**
- quando o agente ficou travado (um olhar novo ajuda);
- depois de consertar um problema complicado.

## Como funciona

1. O agente compara o que foi construído com o que o plano pedia.
2. Um revisor (independente do trabalho original) procura problemas e os classifica:
   - **Crítico** — precisa ser corrigido agora; impede de seguir.
   - **Importante** — corrigir antes de entregar.
   - **Pequeno** — anotar para depois, não bloqueia.
3. O agente te apresenta um resumo: o que está bom, e a lista de problemas por
   gravidade, em linguagem simples.

## O que fazer com o resultado

- Corrigir os **críticos** imediatamente.
- Corrigir os **importantes** antes de seguir.
- Anotar os **pequenos** para depois.
- Se o revisor estiver errado em algum ponto, o agente explica o porquê (com base
  nos testes que provam que funciona) em vez de mudar à toa.

## Nunca

- Pular a revisão porque "é simples".
- Ignorar um problema crítico.
- Seguir para a entrega com problemas importantes em aberto.

## Próximo passo

Com os problemas críticos e importantes resolvidos, siga para a skill
`finishing-a-development-branch` para entregar.
