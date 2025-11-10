---
sidebar_position: 2
---

# Modules

In this architecture, a module represents the fundamental unit of work. A module can be either:

- a **single-file module**, encapsulating a specific piece of logic
- a **folder module**, grouping related files together into a cohesive feature or functional block.

### Single-file module

A **single-file** module is any **importable code artifact** treated as an independent, addressable unit within the application.

It must satisfy the following criteria:

- It is a single file, not a folder or directory.
- It can be imported by other parts of the application using the project’s standard module resolution system.
- Its file type must be recognized by the application’s build, runtime, or bundling toolchain (e.g., .js, .ts, .tsx, .json, .svg, .png, etc.).

:::info
Intuitively, a **single-file** module can be thought of as any file within your project that can be directly imported.
:::

This architecture makes no assumptions about the module system used in the project, whether it’s CommonJS, ES Modules, UMD, or any other format, the structural concepts apply independently of the underlying module syntax.

### Folder modules and Submodules

A **folder module** is a module represented by a directory containing multiple related **descendant** modules.
Folder modules are used when a feature or a functional block requires multiple files to be organized together under a common boundary.

Folder modules can contain inner modules, which we call **Submodules**.
Submodules follow the same definition as any other module: they can be either single-file modules or further folder modules.

:::info
Children modules and their parent module together form one of the basic structural relationships in the system: **children–parent** relationship.
:::

## Dependencies

Modules and their submodules establish a foundational parent-child hierarchy within the system. Another key concept that complements this structure is the notion of _dependency_.

### Dependency definition

A **dependency** exists between **Module A** and **Module B** when any of the following conditions are met:

1. **Module A** directly imports **Module B**.
2. **Module A** _depends on_ any of **Module B's submodules**.
3. Any **submodule of Module A** _depends on_ **Module B**.

Please note that the definition of a dependency is inherently recursive. This recursion is bounded by condition 1, which applies only when both modules involved are [single-file modules](./modules.md#single-file-module).

### Dependency Golden Rule

A project's architecture is considered **valid** when no two modules have circular dependencies. In other words, the dependency graph of all modules must form a **directed acyclic graph (DAG)**.

:::tip Dependency Golden Rule
If **Module A** _depends on_ **Module B**, then **Module B** **must not** _depend on_ **Module A**.
:::

This principle ensures a clear and maintainable structure, preventing tightly coupled modules and fostering scalability.
