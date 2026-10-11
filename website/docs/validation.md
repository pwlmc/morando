---
title: Validation
description:
  Learn how Morando validates project architecture by analyzing file
  dependencies, classifying files into layers, and enforcing rules for files,
  modules, and domains.
---

# Validation

## Project graph

Before validating a project, Morando builds its dependency graph. Traversal
starts from the project's entry point, usually the file configured as your
application bundler's entry point (`src/index.ts` or `src/index.tsx`), and
continues until all project files have been analyzed.

Each traversed file is analyzed to determine whether it violates any validation
rules. The main factors are:

- file name
- file location in the project
- dependencies (imports)

During this process, the file is also classified into a layer. Traversal then
continues to each dependency unless it is `excluded`, as discussed in the next
section.

:::tip Morando does not analyze your code  
By design, Morando does not analyze your code's semantics. It only extracts
dependencies from imports. File locations and dependencies are all the
architecture linter needs to build and validate a project's graph.  
:::

## Gradual migration

Morando's key design principle is to allow existing codebases to migrate to the
new architecture gradually, at a pace that works best for each team. For that
reason, files need to be removable from architecture validation, either
temporarily or permanently. Morando distinguishes between:

- `excluded` - files that Morando does not include in the project graph. They
  cannot cause validation errors. If your project imports such a file, Morando
  treats that import as if it did not exist.

- `legacy` - files that participate in building the project graph but do not
  produce validation errors.

If your project starts with any `legacy` files, the goal is to slowly reduce the
list until it's empty and the migration is done.

## Validation rules

As discussed in the preceding section, only files that are neither `excluded`
nor `legacy` can produce validation errors. Excluded files are not part of the
project graph, while legacy files participate in the graph without producing
errors.

The rules below define what Morando enforces. The concepts behind them are
discussed in the previous chapters.

<!--@include: ./partials/validation-rules.html-->

:::tip Read the table as a checklist.  
Each row describes one of Morando's concepts. A dash (`--`) in the **Forbidden**
column means no additional forbidden conditions are defined for that concept.  
:::
