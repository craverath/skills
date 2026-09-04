---
name: plan-implement-review
description: Orquestre uma mudança de software com subagents em worktrees e revisão independente. Use quando o usuário pedir plan implement review, implementação delegada em paralelo ou sequência, ou um revisor separado. Não use para mudanças simples sem workflow delegado.
compatibility: Requer Git com worktrees e um ambiente com delegação nativa ou um harness externo já instalado e autorizado. O fluxo é portátil entre Claude Code, Codex, Kiro CLI e OpenCode; somente os mecanismos de delegação variam.
---

# Planejar, implementar e revisar

Entregue a mudança pelo caminho mais curto que preserve isolamento, testes determinísticos e uma revisão independente.

Fluxo obrigatório:

```text
planejador -> implementador -> integração -> gate determinístico -> revisão 1
revisão 1 com alto/médio -> implementador -> gate determinístico -> revisão 2
revisão 2 com alto -> implementador -> gate determinístico -> confirmação direcionada
aprovação -> merge na branch principal, somente quando autorizado
```

## Limites do fluxo

- Use um implementador por padrão. Adicione um segundo ou terceiro somente quando as tasks forem independentes e o ganho do paralelismo superar seu overhead.
- Não ultrapasse três implementadores, salvo solicitação explícita do usuário.
- O orquestrador coordena o fluxo, mas não planeja nem implementa. Delegue o plano ao planejador e toda implementação a um ou mais subagentes (`subagents`), cada um em sua própria worktree.
- O revisor também deve ser um subagente independente, em outra worktree, e não pode ter participado da implementação.
- Pergunte apenas quando uma decisão mudar materialmente a solução. Caso contrário, declare a premissa e prossiga.
- Paralelize somente tasks independentes e sem sobreposição de arquivos. Execute dependências sequencialmente a partir do estado já integrado.
- O implementador executa os testes focados necessários para desenvolver sua task. Depois da integração, o orquestrador deve concluir o gate de testes determinísticos antes de iniciar qualquer revisão.
- Faça testes proporcionais ao comportamento alterado e ao risco. Não busque cobertura exaustiva, não teste código não relacionado e não crie matrizes especulativas.
- Não faça refatorações, abstrações, dependências ou documentação fora do necessário para os critérios de aceite.
- Permita no máximo duas rodadas automáticas de correção: uma após a primeira revisão e outra somente para achados altos da segunda revisão. Depois da segunda correção, faça apenas a confirmação direcionada descrita abaixo; não inicie uma nova revisão geral.
- Respeite as instruções locais e os limites de autorização para branch, commit, merge, push e remoção de worktrees.

## Adaptar ao ambiente

Use a delegação e o isolamento nativos do ambiente quando cada participante receber um checkout separado. Caso contrário, use `git worktree` e inicie cada participante no diretório correto.

Use estes papéis por padrão, todos com nível de raciocínio `high`:

| Papel | Executor e modelo padrão |
|---|---|
| Planejador | Codex com `gpt-5.6-sol` |
| Implementador | Claude Code com Sonnet |
| Revisor | Codex com `gpt-5.6-terra` |

Use o identificador vigente do Sonnet configurado no Claude Code; não fixe uma versão específica quando o usuário não a indicar. Uma escolha explícita do usuário substitui esses padrões. Se algum executor ou modelo não estiver disponível, informe a limitação antes de substituí-lo; não instale ferramentas nem faça fallback silencioso.

O adaptador de execução para Claude Code, Codex, Kiro CLI e OpenCode deve:

1. mapear o planejador, cada implementador e o revisor para a capacidade nativa de task, subagente ou harness autorizado;
2. criar ou selecionar uma worktree exclusiva para cada participante;
3. enviar o mesmo plano curto, acrescido apenas do escopo específico;
4. coletar um resumo, o diff ou o commit e os resultados das verificações.

Se não houver como isolar a implementação ou usar um revisor independente, informe a limitação e não afirme que este workflow foi concluído.

## 1. Entender e planejar

Antes de editar, o orquestrador coleta o contexto necessário e o envia ao planejador:

1. Leia as instruções locais, `git status`, a estrutura relevante, o código afetado e os testes existentes.
2. Preserve mudanças preexistentes e evite inspecionar áreas sem relação com a demanda.
3. Peça ao planejador um plano curto com:
   - objetivo e critérios de aceite;
   - arquivos ou áreas prováveis;
   - tasks, propriedade e dependências;
   - validações mínimas;
   - premissas ou riscos reais.

O orquestrador valida o plano contra o pedido e as instruções locais, sem expandir seu escopo. Mantenha o plano na conversa. Crie um arquivo somente quando o repositório exigir ou quando o contexto não puder ser enviado diretamente aos participantes.

## Acompanhamento do progresso

Mantenha o usuário informado sem interromper o fluxo. Envie uma atualização somente ao concluir uma fase, ao encontrar um bloqueio real ou quando o usuário pedir o status.

Use sempre uma única linha neste formato:

```text
Status: <planejamento | implementação | integração | testes | revisão | correção | concluído | bloqueado> | Concluído: <resultado verificável> | Falta: <próxima ação ou condição necessária>
```

- Descreva fatos observáveis; não estime percentuais de conclusão.
- Em implementação paralela, inclua a contagem de tasks, por exemplo `implementação (2/3 tasks concluídas)`.
- Se nada estiver pendente, use `Falta: nada`.
- Em caso de bloqueio, identifique em `Falta` a decisão, autorização ou condição externa necessária.
- Não repita o plano, listas de arquivos ou resultados de testes já informados, salvo quando forem essenciais para entender o estado atual.

## 2. Implementar em worktrees

Use uma worktree exclusiva por subagente implementador e mantenha a worktree do orquestrador somente como ponto de integração.

Para cada implementador, envie somente:

- objetivo e critérios de aceite;
- task atribuída, arquivos permitidos e dependências prontas;
- instruções locais relevantes;
- validações mínimas esperadas;
- formato de retorno: arquivos alterados, validações executadas, premissas e diff ou commit conforme a autorização disponível.

O implementador deve fazer a menor mudança completa, seguir os padrões existentes e adicionar testes apenas para comportamento novo, corrigido ou de risco concreto. Não deve executar toda a suíte sem necessidade, ampliar o escopo nem integrar outras tasks.

Execute tasks independentes em paralelo. Para tasks dependentes ou com arquivos compartilhados, integre e valide uma antes de iniciar a próxima.

## 3. Integrar

Inspecione cada entrega e rejeite somente desvios concretos de escopo ou correção. Integre pelo mecanismo permitido no repositório, respeitando a ordem das dependências:

- Com autorização explícita para commits, use um commit por task e faça cherry-pick.
- Sem autorização para commits, receba o diff do subagente e aplique-o na worktree de integração.

O orquestrador verifica o diff integrado e eventuais conflitos. Resultados dos implementadores são evidência de desenvolvimento, mas não substituem o gate integrado obrigatório antes da revisão.

## 4. Executar o gate de testes determinísticos

Depois de integrar as entregas, execute em uma worktree limpa todos os testes e checks automatizados, determinísticos e relevantes à mudança. Use os comandos documentados pelo projeto e inclua formatter, linter e checagem de tipos somente quando aplicáveis aos arquivos alterados.

O gate deve terminar com sucesso antes de criar ou acionar o revisor. Não faça análise de revisão enquanto o gate estiver pendente ou falhando.

Se o gate falhar:

1. envie ao implementador a falha reproduzível e sua saída relevante;
2. integre a correção;
3. execute novamente as verificações afetadas;
4. prossiga para a revisão somente quando o gate estiver verde.

Testes conhecidos como intermitentes, verificações manuais e dependências externas instáveis não contam como gate determinístico. Registre-os separadamente como limitações sem apresentar um resultado não executado como aprovado.

## 5. Revisar de forma independente

Crie uma worktree limpa no estado integrado e delegue a revisão a um subagente independente que não implementou nenhuma parte da mudança.

Forneça o plano, o diff integrado, as instruções locais e a evidência de que o gate determinístico passou. Peça que o revisor:

- verifique os critérios de aceite e regressões concretas no caminho alterado;
- avalie somente riscos relevantes de segurança e manutenção;
- classifique cada achado como `alto`, `médio` ou `baixo`, sempre com evidência e localização;
- retorne `aprovado` ou `alterações solicitadas` conforme a regra da passagem atual.

Classifique como `alto` somente um problema que possa causar falha grave de correção, segurança, perda de dados ou indisponibilidade no escopo alterado. Classifique como `médio` um defeito concreto e relevante, mas sem esse impacto grave. Use `baixo` para melhorias não bloqueantes.

Somente critério de aceite não atendido, regressão reproduzível, vulnerabilidade relevante ou ausência de um teste essencial para o comportamento alterado pode ser `alto` ou `médio`. Preferências de estilo, melhorias especulativas e cobertura extra não prolongam o fluxo.

### Primeira revisão

- Achado `alto` ou `médio`: retorne ao implementador com `alterações solicitadas`.
- Apenas achados `baixos`, ou nenhum achado: retorne `aprovado` e não abra correção.

### Segunda revisão

Execute-a somente após integrar a primeira correção e repetir com sucesso as verificações determinísticas afetadas.

- Achado `alto`: retorne ao implementador com `alterações solicitadas`.
- Apenas achados `médios` ou `baixos`, ou nenhum achado: retorne `aprovado`. Não devolva ao implementador; registre achados médios remanescentes no resultado final.

## 6. Corrigir e encerrar

Na primeira revisão, delegue a correção dos achados altos e médios ao mesmo implementador sempre que possível. Integre a correção, repita o gate determinístico afetado e envie o novo estado ao mesmo revisor para a segunda revisão.

Se a segunda revisão encontrar um achado alto, delegue uma segunda e última correção ao implementador. Depois de integrar e repetir o gate determinístico afetado, peça ao mesmo revisor somente a confirmação direcionada dos achados altos. Essa confirmação retorna `aprovado` se eles tiverem sido resolvidos. Se algum persistir ou surgir outro achado alto, pare e informe o usuário; não inicie outra correção ou revisão geral automaticamente.

Quando a revisão for aprovada, faça merge na branch principal somente se o usuário tiver autorizado explicitamente essa operação. Sem autorização, mantenha a branch pronta, informe o parecer e apresente o próximo passo de integração sem executar o merge. Nunca faça merge com gate determinístico falhando ou revisão pendente.

## Saída

Informe de forma concisa:

- resultado e principais arquivos alterados;
- worktrees ou tasks usadas e forma de integração;
- testes executados e resultado;
- parecer independente, passagem que aprovou e achados médios remanescentes da segunda revisão, se houver;
- bloqueios ou riscos restantes.

Não faça merge na branch base, push, pull request, exclusão de branch ou remoção de worktree sem autorização explícita.
