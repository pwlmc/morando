---
sidebar_position: 3
---

# Layers

Layers are the architectural backbone of Morando architecture. They help define how your code is organized, who can depend on whom across modules. If you want maintainable boundaries and predictable module relationships, layers are the tool for the job.

## What Is a Layer?

A layer is simply a name that represents a level of abstraction in your project. Examples might include: core, domain, features, or ui.

Each project using this architecture must define its own **ordered list of layers** upfront. This order matters because it establishes allowed directions of dependencies. In short:

- Higher layers can depend on lower ones.
- Lower layers cannot depend on higher ones.

Without this layered structure in place, there’s no way to enforce architectural boundaries or detect invalid dependencies.

### Layer Representation

In this system, **every single-file module must belong to a layer**.

When a file is assigned to a layer, we say it **represents** that layer.
These files are the **layer representatives** and they serve as the smallest, most atomic participants in layer validation mechanism.

<details>
<summary>How Is a File Assigned to a Layer?</summary>


By default, the system uses a classifier defined in the project template based on file or folder naming convention 
(more on Templates later). Ideally, it should work well for most of the use cases and remove the need for manual tagging to zero.

However, you can also define **custom classification rules** at the project level. For example, you might want to classify files by filename pattern (e.g., \*.service.ts → domain layer). These custom rules override the default behavior and allow you to make the architecture truly your own. 
It may also come in handy during the transition periods, for example while the project is gradually updated to comply with the Modando architecture.
</details>

For **folder modules** we determine their layer representation by the **highest layer represented by their submodules**. For example, the following folder module:

```
.
└── MyModule
    ├── firstLayerModule.ts
    └── SecondLayerFile.ts
```

Assuming that:
- `firstLayerModule.ts` represents `first` layer
- `SecondLayerFile.ts` represents `second` layer
- In the list of layers `second` is higher than `first`
  
Then `MyModule` represents `second` layer.

:::info
Notice that it's relatively easy to change the folder module layer by moving the submodules around. 
:::

## The Golden Rule of Layers

To keep your architecture clean, there’s one core rule you need to follow:

:::tip
A module can only depend on the same layer module or module representing lower layers.
:::

The rule is **strict** and **global**:

- It doesn’t matter is the two dependant modules have the same ancestor or not.
- **Importing upward** in the layer hierarchy is always considered invalid.
