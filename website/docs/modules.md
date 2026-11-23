---
title: Modules
description:
  A Morando module is a vertical slice of the application, a folder that
  encapsulates one well-defined concern across every layer. Learn the structure,
  naming rules, and import boundaries.
---

# Modules

## What Is a Module?

In Morando, a module represents the fundamental unit of work.

Conceptually, a module is a _vertical slice_ that encapsulates a single,
well-defined concern of the application. A "vertical slice" means that a module
may contain code from all the layers defined for your application, but we will
discuss layers in detail in the [Layers](./layers.md) chapter.

From a technical perspective, a module is simply a folder that follows a defined
structure. By convention, module folder names start with a capital letter and
contain source code files. Below you can find an example of a `User` module:

```text
User/
├── model.ts
├── api.ts
├── useUser.ts
└── UserAvatar.tsx
```

## Modules Are Flat

A module contains source files directly and cannot contain subfolders. A file
in a module has the path `@/Domain/Module/file`.

## Module Dependencies

While modules can't be nested, they can depend on each other. We say that
`Module A` depends on `Module B` if any file from `Module A` imports any file
from `Module B`.

Analyzing dependencies between modules can reveal a lot about the overall
condition of a project. A project's architecture is considered valid when no two
modules depend on each other cyclically. In other words, the dependency graph of
all modules must form a _directed acyclic graph (DAG)_.

:::tip Dependency Golden Rule  
If `Module A` depends on `Module B`, then `Module B` _must not_ depend on
`Module A`.  
:::

This basic principle ensures a clear and maintainable structure, preventing
tightly coupled modules and fostering scalability.
