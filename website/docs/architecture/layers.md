---
sidebar_position: 3
---

# Layers

Layers are the architectural backbone in this system. They help define how your code is organized, who can depend on whom across modules. If you want maintainable boundaries and predictable module relationships, layers are the tool for the job.

## What Is a Layer?

A layer is simply a name that represents a level of abstraction in your project. Examples might include core, domain, features, or ui.

Each project using this architecture must define its own **ordered list of layers** upfront. This order matters because it establishes allowed directions of dependencies. In short:

- Higher layers can depend on lower ones.
- Lower layers cannot depend on higher ones.

Without this layered structure in place, there’s no way to enforce architectural boundaries or detect invalid dependencies.

### Layer Representatives

In this system, **every single-file module must belong to a layer**.

When a file is assigned to a layer, we say it **represents** that layer.
These files are the “layer representatives” - they serve as the smallest, most atomic participants in layer enforcement.

### How Is a File Assigned to a Layer?

By default, the system uses a **built-in** classifier based on file or folder naming (see “Layer Modules” below). This works automatically - no manual tagging needed.

However, you can also define **custom classification rules** at the project level. For example, you might want to classify files by filename pattern (e.g., \*.service.ts → domain layer). These custom rules override the default behavior and allow for greater expressiveness.

## The Golden Rule of Layers

To keep your architecture clean, there’s one core rule you need to follow:

:::tip
A single-file module can only import from the same layer or from layers below it.
:::

The rule is **strict** and **global**:

- It doesn’t matter which folder the module lives in.
- It applies **only** to single-file modules (not folders as a whole).
- **Importing upward** in the layer hierarchy is always considered invalid.

## Layer Modules

A **layer module** is any folder or file named **exactly the same** as one of your defined layers (e.g., a folder named domain/ or a file named core.ts).

Layer modules serve two essential functions:

1. Create layer ceiling for the submodules
2. Provide the default layer classification

### Layer Ceiling for the submodules (folder modules only)

A folder module named after a layer establishes a **ceiling** for its entire subtree: All submodules inside this folder **must belong to the same or a lower layer**.

:::info
This rule is designed to **limit the indefinite nesting of modules**.
While users can technically continue nesting modules indefinitely if they misuse the rule, its purpose is to prevent the accidental creation of **deeply nested pockets of applications**.
Without this rule, such situations could easily arise.
:::

### Default Layer Classification

Layer modules also act as **default classifiers**, helping assign layers to other modules in the absence of custom rules.

#### Single-File modules

If the **file’s name** matches a known layer (e.g., domain.ts), it is automatically treated as a **representative** of that layer.

#### Folder Modules

If a file is inside a **folder named after a layer** (e.g., domain/helpers/math.ts), it **inherits that layer** by default - unless overridden by a deeper nested layer module.

:::note
The default layer classifiers have the **lowest precedence**. If your project defines custom rules, they will take priority.
:::

## Summary

- Layers define allowed dependency directions.
- Every single-file module must represent a layer.
- The system enforces a strict top-down dependency rule.
- Layer modules help classify files and enforce layer ceilings.
- Custom layer classification is fully supported and encouraged.
