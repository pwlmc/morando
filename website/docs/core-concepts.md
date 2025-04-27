---
sidebar_position: 3
---

# Core concepts

## Module

In this architecture, a module represents the fundamental unit of work. A module can be either:

- a **single-file module**, encapsulating a specific piece of logic
- a **folder module**, grouping related files together into a cohesive feature or functional block.

### Single-file module

A **single-file** module is any **importable code artifact** treated as an independent, addressable unit within the application.

It must satisfy the following criteria:

- It is a single file, not a folder or directory.
- It can be imported by other parts of the application using the project’s standard module resolution system.
- Its file type must be recognized by the application’s build, runtime, or bundling toolchain (e.g., .js, .ts, .tsx, .json, .svg, .png, etc.).

### Folder modules and submodules

A **folder module** is a module represented by a directory containing multiple related **descendant** modules.
Folder modules are used when a feature or a functional block requires multiple files to be organized together under a common boundary.

Folder modules can contain inner modules, which we call **submodules**.
Submodules follow the same definition as any other module: they can be either single-file modules or further folder modules.

:::info
Children modules and their parent module together form one of the basic structural relationships in the system, known as the **children–parent** relationship.
:::
