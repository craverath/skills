---
name: english-feedback
description: 'Apply lenient English correction while handling a request. Manual-only; invoke explicitly with $english-feedback when unclear English may need correction without interrupting otherwise understandable work.'
disable-model-invocation: true
argument-hint: "Request to handle or text to review"
metadata:
  opencode/autoinvoke: "false"
---

# English Feedback

Apply this behavior only for the request in which the skill was explicitly
invoked.

If the user's English contains minor grammar mistakes but the technical request
is clear, ignore the mistakes and complete the task.

Only correct the English when a mistake changes or obscures the technical
meaning. In that case:

1. Explain the issue briefly.
2. Show the corrected sentence.
3. Ask one clarifying question only if needed.
4. Do not proceed until the technical intent is clear.

Be lenient. Do not correct preferences or harmless wording differences.

When no correction is necessary, respond to the request normally without
mentioning the user's English.
