---
name: brainstorming
description: First step of the guided flow for non-developers. Use before building anything. Turns a rough idea into a clear, approved design through one-question-at-a-time conversation. No code is written until the user approves the design.
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Edit
---

# Brainstorming — Descrever a ideia

Ajude a pessoa (que **não é programadora**) a transformar uma ideia solta em um
desenho claro do que será construído. Faça isso conversando, em linguagem simples.

**Regra de ouro:** Não escreva código, não crie arquivos de projeto e não comece a
construir nada até apresentar um desenho da solução e a pessoa aprovar. Isso vale
para qualquer projeto, por mais simples que pareça.

## Anti-padrão: "isso é simples demais para precisar de desenho"

Todo projeto passa por aqui. Mesmo uma lista de tarefas ou uma mudança pequena.
Projetos "simples" são onde suposições erradas mais geram retrabalho. O desenho
pode ser curto (poucas frases), mas você **precisa** apresentá-lo e ter aprovação.

## Passos (faça nesta ordem)

1. **Entender o contexto** — olhe os arquivos e o que já existe no projeto.
2. **Fazer perguntas, uma de cada vez** — entenda o objetivo, as limitações e o que
   significa "deu certo" para a pessoa.
3. **Propor 2-3 caminhos** — explique os prós e contras de cada um, em linguagem
   simples, e diga qual você recomenda e por quê.
4. **Apresentar o desenho** — em pedaços curtos o suficiente para a pessoa ler e
   entender. Pergunte, a cada pedaço, se está certo antes de continuar.
5. **Salvar o desenho** — grave em `docs/specs/AAAA-MM-DD--desenho.md`.
6. **Revisar o desenho** — releia procurando partes vagas, contradições ou pontos
   "a definir". Corrija na hora.
7. **Pedir a aprovação final** — peça para a pessoa ler o desenho salvo e confirmar.
8. **Passar para o plano** — só então use a skill `writing-plans`.

## Como conversar

- **Uma pergunta por mensagem.** Não despeje várias perguntas de uma vez.
- **Prefira múltipla escolha** ("A, B ou C?") — é mais fácil de responder do que
  perguntas abertas.
- **Sem jargão.** Se precisar usar um termo técnico, explique em uma frase.
- Foque em entender: para que serve, quais os limites, como saber que ficou bom.

## Como apresentar o desenho

- Mostre em seções curtas, do tamanho da complexidade de cada parte.
- Cubra, em linguagem simples: o que o sistema faz, quais são as partes, como elas
  conversam entre si e o que acontece quando algo dá errado.
- Esteja pronto para voltar e ajustar se algo não fizer sentido para a pessoa.

## Princípios

- **YAGNI** — corte tudo que não é necessário agora. Menos é mais.
- **Validação por etapas** — apresente, aprove, só então avance.
- **Seja flexível** — volte e esclareça sempre que algo não fizer sentido.

## Próximo passo

O único próximo passo depois daqui é a skill **writing-plans**. Não comece a
construir nada antes disso.
