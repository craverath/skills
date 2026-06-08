# non-dev-guided-development

Um fluxo de desenvolvimento guiado para **quem não é programador**. Você descreve
o que quer; o agente cuida da parte técnica e te explica cada passo em linguagem
simples. Baseado na metodologia [Superpowers](https://github.com/obra/superpowers)
(obra/superpowers), simplificada para não-devs.

## A ideia central

Você não precisa escrever código. Seu papel é: **explicar o que quer, responder
perguntas e aprovar cada etapa.** O agente nunca pula direto para o código — ele
primeiro entende, planeja, constrói com segurança, revisa e só então entrega.

## O fluxo (nesta ordem)

1. **brainstorming** — Descrever a ideia. O agente faz perguntas, uma de cada vez,
   até entender o que você quer, e te mostra um desenho da solução para aprovar.
2. **writing-plans** — Montar o plano. A ideia aprovada vira uma lista de passos
   pequenos e claros, para você saber exatamente o que vai ser feito.
3. **test-driven-development** — Construir com testes. Para cada parte, o agente
   primeiro escreve um teste que prova que algo funciona, depois constrói até passar.
4. **requesting-code-review** — Revisar o trabalho. Antes de dar por pronto, uma
   revisão independente procura problemas e os classifica por gravidade.
5. **finishing-a-development-branch** — Entregar. O agente confirma que tudo passa
   nos testes e te apresenta opções claras de como finalizar.

## Regras que valem para todo o fluxo

- O agente **nunca** finaliza/salva o trabalho (commit, push) sem você confirmar.
- Nada de pular etapas porque "parece simples" — toda ideia passa pelo fluxo.
- Cada decisão importante é apresentada para você aprovar antes de seguir.

## Tecnologia (fixa, por padrão)

Você não escolhe a linguagem — ela é definida pelo tipo de projeto, e o agente já
segue isso automaticamente (está nas regras globais, não é preciso pedir):

- **Site ou app no navegador** → Next.js + TypeScript.
- **Script, automação ou linha de comando** → Python.
- **Programa de janela no computador (desktop)** → Python ou Electron.

Sempre **com tipagem** e **com testes** — em qualquer caso. As ferramentas exatas de
cada base e o critério de desempate de desktop estão em `../global-rules/AGENTS.md`
(seção "Technology stack").

Veja também as regras globais do agente em `../global-rules/AGENTS.md`.
