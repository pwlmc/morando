---
title: Layers
description:
  Layers express the technical shape of a Morando application. Learn how layers
  differ from modules, how they are defined, and how dependencies between them
  are enforced.
---

# Layers

## Modules vs. Layers

While modules are specific to your project, layers are closely related to the
tech stack.

Every project that uses Morando architecture will inevitably contain different
modules. That is expected, because modules express the application's business
domain. You cannot expect an online banking app to have the exact same set of
modules as, for example, a hotel-booking app. Some modules may be similar, for
instance, both may include a `@/Routing` module, but the core business modules
will still diverge.

Layers are different. In all Morando applications, you will find some universal
base layers that are always present. In many apps, the list of layers will be
identical. That makes it much easier to switch between projects when you have a
consistent set of layers to anchor yourself to. Let's define what layers are so
we can see how this emerges.

## What Are Layers?

A layer is simply a name that represents a level of abstraction in a Morando
project.

The lowest layers are those that contain the most core and abstract definitions
on top of which you want to build the rest of your application. The higher the
layer, the more implementation-specific and less abstract it becomes.

For each project, the list of layers needs to be defined upfront because without
it we can't validate the project's architecture. More details on what a concrete
list of layers might look like will be discussed in the
[Layer groups](./layer-groups.md) chapter. For now, it is enough to assume that
layers are an ordered list of names defined for a Morando project.

## Files Are Classified to Layers

In Morando architecture, every file must be classified to a layer.

A file is assigned to a layer by a classifier function. Because Morando never
parses a file's code, the classifier usually tries to assign a file based on its
location in the project, file name, extension, and so on. For example, in a
React project that defines a `components` layer, a `Button.tsx` file may be
classified to that layer because it starts with an uppercase letter and has a
`tsx` extension.

The classifier's algorithm is an implementation detail specific to the concrete
list of layers, and we will not discuss it here. That said, there is one
universal classifier for all Morando projects, already mentioned in the
[Modules](./modules.md#modules-are-flat) chapter.

Layer folders are special folders named exactly as the layer. They are optional
folders that can be placed inside a module and act as classifiers for all files
inside them. For example, in the case of the following hypothetical module:

```text
Shared/
└── components/
    ├── foo.ts
    └── bar.ts
```

`foo.ts` and `bar.ts` would be classified to the `components` layer. Of course,
that assumes the project defines the `components` layer; otherwise, the
`components/` folder would not be a valid layer folder.

## The Golden Rule of Layers

Before we move forward, we need to discuss one important rule that makes layers
so important for a project's stability and validity.

:::tip Layers Golden Rule  
A file can depend only on files from the same or lower layer.  
:::

The rule is global, which means it does not matter what module the file is
located in. As long as the file is not importing a file that is classified to a
layer higher than its own, the rule is not violated.
