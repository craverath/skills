---
name: test-driven-development
description: Third step of the guided flow for non-developers. Use while building each part of the plan. Explains and enforces test-first construction (write a test, watch it fail, build the minimum to pass) in plain language so non-devs understand what guarantees the work is correct.
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
---

# Test-Driven Development — Construir com testes

Construa cada parte do plano usando **testes primeiro**. Um teste é uma verificação
automática que confirma que algo funciona como deveria. Fazer o teste antes garante
que o agente está construindo a coisa certa — e que ela continua funcionando depois.

Você não precisa escrever testes; o agente faz isso. Mas vale entender o ciclo,
porque é ele que te dá segurança de que o trabalho está correto.

## A regra principal

> Nenhuma parte é construída sem um teste que primeiro **falhe**.

Se o agente escrever o código antes do teste, ele apaga e recomeça pelo teste. Ver o
teste falhar primeiro é o que prova que o teste realmente verifica alguma coisa.

## O ciclo (vermelho → verde → limpar)

1. **VERMELHO — escrever o teste primeiro.**
   O agente escreve uma verificação do que a parte deveria fazer.
2. **Ver o teste falhar.** Obrigatório. Roda o teste e confirma que ele falha pelo
   motivo certo (a funcionalidade ainda não existe) — não por um erro de digitação.
3. **VERDE — construir o mínimo.** O agente escreve só o suficiente para o teste passar.
   Nada de adicionar extras que ninguém pediu.
4. **Ver o teste passar.** Obrigatório. Roda de novo e confirma que passou, sem erros
   nem avisos, e que os outros testes continuam passando.
5. **LIMPAR.** Com tudo passando, o agente organiza o código (sem mudar o comportamento)
   e mantém os testes verdes.

Depois, repete o ciclo para a próxima parte.

## Por que fazer o teste antes

- Teste escrito **depois** do código quase sempre passa de cara — e isso não prova
  nada, porque você nunca o viu pegar um erro.
- Teste escrito **antes** força a pensar no que é certo, e você vê ele falhar e
  depois passar — prova de que ele funciona.
- "Eu testei na mão e funcionou" não basta: não fica registrado, não dá para repetir
  toda vez que algo mudar.

## O que apresentar para a pessoa

A cada parte construída, explique em linguagem simples:

- o que essa parte faz;
- qual verificação (teste) prova que ela funciona;
- que todos os testes estão passando.

## Quando corrigir um problema (bug)

Antes de consertar, o agente escreve um teste que reproduz o problema (ele deve
falhar), conserta até o teste passar, e assim o problema fica registrado para nunca
mais voltar sem aviso.

## Próximo passo

Quando as partes do plano estiverem construídas e com testes passando, siga para a
skill `requesting-code-review` para uma revisão antes de dar por pronto.
