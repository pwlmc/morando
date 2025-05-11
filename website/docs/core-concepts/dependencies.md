---
sidebar_position: 2
---

# Dependencies

As explained in [Modules](./modules.md), modules and their submodules establish a foundational parent-child hierarchy within the system. Another key concept that complements this structure is the notion of _dependency_.

## Dependency definition

A **dependency** exists between **Module A** and **Module B** when any of the following conditions are met:

1. **Module A** directly imports **Module B**.
2. **Module A** _depends on_ any of **Module B's submodules**.
3. Any **submodule of Module A** _depends on_ **Module B**.

Please note that the definition of a dependency is inherently recursive. This recursion is bounded by condition 1, which applies only when both modules involved are [single-file modules](./modules.md#single-file-module).

## Dependency golden rule

We say that the project's architecture is **valid** when no pair of modules depend on one-another. The graph of modules and it's dependencies needs to form a directed acycyclic graph.

:::tip[Dependency golden rule]
If **Module A** _depends_ on **Module B**,then **Module B** **must not** _depend_ on **Module A**.
:::
