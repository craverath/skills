---
name: writing-plans
description: Second step of the guided flow for non-developers. Use after a design is approved in brainstorming. Turns the approved design into a clear plan of small, verifiable steps so the user knows exactly what will be built before any code is written.
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Edit
---

# Writing Plans — Montar o plano

Depois que o desenho foi aprovado na skill `brainstorming`, transforme-o em um
**plano de passos pequenos e claros**. O objetivo é que a pessoa (que não programa)
consiga ler o plano e entender exatamente o que vai ser feito, na ordem.

**Avise ao começar:** "Estou montando o plano de construção a partir do desenho que
você aprovou."

**Salve o plano em:** `docs/plans/AAAA-MM-DD--plano.md`

## Como dividir o trabalho

Quebre tudo em **tarefas pequenas**, cada uma com um resultado que dá para verificar.
Pense em passos de poucos minutos, do tipo:

- escrever um teste que prova o que a parte deveria fazer;
- rodar o teste e ver que ele falha (porque a parte ainda não existe);
- construir o mínimo para o teste passar;
- rodar de novo e ver que passou;
- guardar o progresso.

Cada tarefa deve deixar o projeto um pouco mais completo e funcionando por conta
própria — nada de "metade de uma coisa".

## O que cada tarefa precisa ter

- **O que será feito**, em uma frase simples.
- **Como saber que deu certo** — o que verificar ao final (o que aparece na tela,
  o que o teste confirma).
- A ordem em relação às outras tarefas.

Você pode incluir os detalhes técnicos (arquivos, código), mas sempre acompanhados
de uma explicação curta do "para quê", para a pessoa entender o sentido de cada passo.

## Nada de buracos no plano

Não escreva passos vagos como "fazer o resto depois", "tratar os erros" ou "adicionar
testes" sem dizer concretamente o quê. Se um passo precisa de detalhe, coloque o
detalhe. Um plano com lacunas vira retrabalho.

## Revisão do plano (faça você mesmo)

Releia o desenho e confira o plano contra ele:

1. **Cobertura** — cada coisa que o desenho pediu tem uma tarefa que a realiza?
   Liste o que faltar e adicione.
2. **Lacunas** — algum passo vago ou "a definir"? Corrija na hora.
3. **Coerência** — os passos fazem sentido juntos e na ordem certa?

## Apresentar e seguir

Mostre o plano para a pessoa e explique-o em linguagem simples. Pergunte se ela
aprova ou quer ajustar algo. Só depois da aprovação, siga para a skill
`test-driven-development` para começar a construir.
