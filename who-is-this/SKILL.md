---
name: who-is-this
description: 'Research one person across public X, LinkedIn, GitHub, and web sources to assess professional claims. Manual-only; invoke explicitly for "who is this", "research this person", "are they legitimate", or "vet this founder". Produces a short sourced assessment, not a full background check.'
license: MIT
compatibility: Requires network access and web search or browser tools; public platform APIs are optional.
disable-model-invocation: true
metadata:
  opencode/autoinvoke: "false"
  source: "https://github.com/davidondrej/skills"
  source-commit: "9dc174b058f7a21d3269584ec589b637bd53801d"
---

# who-is-this

Figure out who a person is and whether their public professional story holds.

## Seed

Need a person. A name, handle, URL, or profile screenshot with identifying text is enough. Do not identify an unknown person from facial appearance.

If missing, ask once. Do not guess a different person.

Verify identity before going deep. Bio, company, location, and photo must match. If two people share the name, stop and ask.

## Research

Use the strongest available public sources: official profiles, platform APIs, reputable reporting, company registries, conference pages, and archived project pages. DeepAPI may be used when configured, but it is not required. Then research these independent tracks in parallel when the host supports it:

1. **GitHub activity.** Profile, owned repositories, substantive commits, and recent pull requests.
2. **LinkedIn history.** Public profile and recent public posts, when accessible.
3. **Independent evidence.** Reputable sources confirming roles, products, funding, publications, talks, or other major claims.
4. **X activity.** Public profile and enough recent posts to identify recurring professional topics without treating posts as independent verification.

Respect access controls and platform terms. If a profile is missing, private, or blocked, say so. Do not invent or bypass access restrictions.

Limit the work to public professional information. Exclude home addresses, private contact details, family information, precise location, protected traits, and other sensitive personal data.

## What to extract

Scrape wide, report narrow. From everything you pulled, keep only the 3 facts that explain who this person is. Drop the rest — a full CV is a failure, not thoroughness.

Rules:

- Real track record beats bio. Jobs, products, exits, code, talks.
- Self-reported numbers stay labeled "their claim". Call a claim verified only when an independent reliable source supports it.
- Note what they actually post about only if it changes the verdict.
- Use a neutral professional characterization such as builder, marketer, operator, researcher, investor, recruiter, or hobbyist. Avoid inflammatory labels unless reliable public evidence clearly establishes them.

Ignore congrats, logo spam, paid "king of X" press, and follower-count flexing.

## Output

Hard cap: 120 words after the header line. Plain English. Short sentences. No tables. No sub-bullets. No post dumps. No research narration. Link each material claim to its supporting source.

```markdown
**Full name** — [@handle](https://x.com/handle) · [LinkedIn](url) · [GitHub](url) · [Site](url)

**Who:** One sentence. Where they are and what they do now.

**Track record:** Max 3 bullets. Only what explains who they are. Dates. Label claims vs verified.

**Verdict:** One line. The archetype, whether the story holds, and why.
```

Example of the right length (fictional):

```markdown
**Jane Doe** — [@janedoe](https://x.com/janedoe) · [LinkedIn](https://linkedin.com/in/janedoe) · [GitHub](https://github.com/janedoe)

**Who:** Berlin solo founder of Acme, an open-source Postgres proxy. Writes 90% of the commits herself.

**Track record:**
- 2024–now: Founder, Acme. 2.1K stars (verified), no funding, no revenue (her own post).
- 2019–2024: Backend engineer at Zalando and N26.
- "50K users" is her claim; nothing backs it.

**Verdict:** Solo builder, not a company yet. Real code, honest numbers, one unproven user claim.
```

Omit a missing profile link instead of faking it.

Follow-ups: answer in 1–3 sentences. Do not re-run the scrape unless the first pass missed that platform.
