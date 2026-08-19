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
├── api.ts
├── model.ts
├── UserAvatar.tsx
└── useUser.ts
```

## Modules Are Flat

One module folder can't be placed inside another module folder. That said,
modules can contain folders. They cannot be just any folders, and their names
are strictly tied to the layers defined in your project. They are _layer
folders_, and to make them easier to tell apart from modules, their names start
with a lowercase letter.

We will cover them in the [Layers](./layers.md) chapter, but for this chapter,
it is enough to remember that they are optional. Like modules, layer folders
also cannot be nested.

Below is an example of a `Shared` module that contains `utils` and `components`
layer folders.

```text
Shared/
├── utils/
│   ├── getId.ts
│   └── getName.ts
└── components/
    ├── FilterButton.tsx
    └── ProductIcon.tsx
```

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
