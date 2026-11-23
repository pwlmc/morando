---
title: Getting started
description:
  Install the Morando skill for your coding agent and learn about the
  architecture linter.
---

# Getting started

## Use Morando with a coding agent

Install the
[Morando skill](https://github.com/pwlmc/morando/tree/main/skills/morando):

::: code-group

```sh [Skills]
npx skills add pwlmc/morando --skill morando
```

```sh [GitHub CLI]
gh skill install pwlmc/morando morando
```

:::

Ask your agent to use the Morando skill when adding a feature, moving files, or
reviewing imports. For example: “Use the Morando skill to add checkout
validation and link to the rules behind your placement and import choices.”

## Morando linter is under development

Morando is an architecture toolkit for front-end applications. It will include a
linter that helps teams define and enforce architectural rules across their
projects.

The toolkit is currently under development. The first alpha release is planned
for 2027.

For release announcements and development updates, follow
[pwlmc on Bluesky](https://bsky.app/profile/pwlmc.bsky.social).
