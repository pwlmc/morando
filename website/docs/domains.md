---
title: Domains
description:
  A Morando domain groups related modules under a shared business area. Learn
  where domains live, how they are named, and the rules that govern what they
  may contain.
---

# Domains

## What Is a Domain?

In Morando, a domain is a folder containing a collection of modules.

Domains are intentionally simpler than modules. Their role is to group related
modules under a shared, high-level business area.

## Domain Location

Every domain folder must be located at the root of the source code folder. That
source code folder is usually called `src/`, but for simplicity we will be
referring to it in the rest of the documentation as `@/`.

By convention, domain names start with an uppercase letter, just like module
names. This makes domains easy to spot and keeps the top-level structure
consistent.

## Domains Contain Modules

Each module must be placed inside a domain. In other words, modules are never
top-level folders on their own. Consequently, domains can contain only modules;
files or layer folders cannot be placed directly inside a domain folder. Below
is an example structure:

```text
.
├── Checkout/
│   ├── Cart/
│   └── Payment/
├── Catalog/
│   ├── ProductDetails/
│   └── ProductList/
└── DesignSystem/
    ├── Button/
    ├── Dropdown/
    └── Theme/
```

In this example, `Checkout`, `Catalog`, and `DesignSystem` are domains, and each
contains one or more modules.

:::tip File path anatomy  
Given any path, we can easily identify the domain and module where the file is
located. For example, `@/Api/Product/useProduct.ts` tells us that the
`useProduct.ts` file is part of the `Api` domain and the `Product` module.  
:::

## Domain Dependencies

As with modules, analyzing domain dependencies gives a lot of useful information
about the application architecture. `Domain A` depends on `Domain B` if any
module from `Domain A` depends on any module from `Domain B`.

Unlike modules, however, domains can be circularly dependent on each other. If
`Domain A` depends on `Domain B`, there is nothing preventing `Domain B` from
depending on `Domain A`.
