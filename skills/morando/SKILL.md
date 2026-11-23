---
name: morando
description: Apply Morando architecture when adding, moving, or reviewing code in a Morando project. Use for placing files, designing domain and module boundaries, choosing layers, or checking imports and architectural changes.
---

# Morando architecture

Use the Morando docs as the authority for validation, and the project's configuration for source root, layer order, classifiers, and migration exceptions. The docs describe the architecture; installed tooling may not yet enforce every rule. Keep the hard rules below separate from the design guidance.

## Hard validation rules

- **Structure:** `@/Domain/Module/file` (`@/` means the source root, not necessarily a configured import alias). Domains sit directly under the source root and contain only modules. Files belong directly inside modules. Modules cannot contain subfolders. Capitalize domain and module names by convention.
- **Classification:** Every validated file must classify into a configured layer. Layers are ordered classifications, not path segments. Use the project's classifier and naming conventions; do not infer the layer from a module name or the presence of a private helper. Each layer belongs to a stack, and each stack needs at least one layer. From lowest to highest, the stacks and their default layers are Definitions (`defs`), Operations (`ops`), Presentation (`ui`), and Bootstrap (`main`). Projects can use different layer names and multiple layers per stack.
- **React defaults:** From lowest to highest: `defs`, `ops`, `hooks`, `components`, `pages`, `main`. `hooks` belongs to Operations; `components` and `pages` belong to Presentation. Use the project's configured order if it differs.
- **Layer golden rule:** A file may depend only on files in the same or a lower layer. This applies both within and across modules. Compare the actual configured layer ranks, not just the stacks.
- **File cycles:** The file dependency graph must be acyclic. Even same-layer imports cannot form a direct or transitive cycle.
- **Module golden rule:** An import from any file in module A to any file in module B makes A depend on B. B must not depend back on A, directly or transitively. The module graph must be a DAG independently of the file graph; imports between different pairs of files can form a module cycle without a file cycle.
- **Domain cycles are allowed:** A domain depends on another domain if any of its modules depends on a module in that domain. The domain graph may contain cycles, provided the file and module rules still hold.
- **Migration:** Morando builds an import graph from the project's entry point, not from code semantics. `excluded` files are absent from that graph; imports of them are treated as absent. `legacy` files remain in the graph but do not produce validation errors themselves. Do not add migration exceptions to make new code pass.

## Design guidance, not Morando validation

- **Treat each file as a micro-module.** Keep types, helpers, and other implementation details private beside the code that uses them. A component file can contain its own types and utilities. Do not extract or export them just to give each layer a file. Extract when there is a concrete consumer or a real responsibility boundary. If an import would otherwise point up, move the shared abstraction to a suitable lower layer instead of importing the higher-layer file.
- **Build modules around a model.** Choose a coherent product or platform concept with clear ownership of its vocabulary, invariants, and behavior. A module can contain definitions, operations, and UI for the same concept. Do not split a cohesive model by technical role or create an empty model file for symmetry.
- **Prefer stable dependency direction.** For each affected module, count distinct outgoing module dependencies (`Ce`) and distinct incoming module dependents (`Ca`). Compare before and after with instability `I = Ce / (Ca + Ce)` when the denominator is nonzero. `0` means no outgoing dependencies; `1` means no incoming dependents. Treat isolated modules separately. Prefer dependencies on more stable modules and avoid adding dependencies to widely used modules. Assess the changed graph, not a project-wide average: adding incoming dependents lowers `I` without automatically improving the design.
- **Name modules for what they own.** Avoid names that repeat configured layers, such as `Components` for a `components` layer. Such names are valid but obscure the module's model.
- **Keep platform independent of product.** Product modules can use platform modules, such as those under `DesignSystem`. Platform modules must not depend on product modules, directly or transitively. Keep product-specific wiring on the product side.
- **Never use index barrels.** Import directly from the file that defines the symbol. Do not add or route imports through an `index.*` re-export barrel. An executable entry point named `index.*` is not a barrel.
- **Import paths follow module boundaries.** Use relative imports within the same module. Use absolute imports across modules, even within the same domain. Use the configured source root alias when one exists.
- **Do not force import conventions on clearly legacy files.** Leave existing legacy import paths alone unless the task explicitly migrates them or a functional change requires an update. In particular, do not rewrite `foo/bar` to `foo/bar/index` when both resolve to the same barrel. The longer path does not remove the barrel.
- **Resolve files found directly under a domain.** Domains contain only module folders. Move each misplaced file into an existing module that owns its concern, or create a cohesive new module if one fits. If neither fits, use `Shared`, the reserved name for a domain's general-purpose module. Reuse an existing `Shared`; if the domain already has a general-purpose module under another name, rename it to `Shared` and update its imports rather than creating a second one. Create `Shared` only as a last resort.
- **Revisit `Shared` as the domain evolves.** Prefer domains without `Shared`, but accept it when files have no better home. Treat its files as refactoring candidates. When adding or refactoring files in the domain, consider moving related files out of `Shared` if they fit an existing module or form a cohesive new one.

## Workflow for a change

1. Find the owning model and the project's source root, layer configuration, and applicable checks. Prefer an existing module if it owns the concern.
2. Choose the file based on ownership and actual consumers. Keep private code local. Check the classifier before adding or renaming a file.
3. Trace new or redirected imports. Check layer direction per file and cycles separately in both the file and module graphs. Check platform independence and the stability impact on affected modules.
4. Run the project's Morando check if available, then the targeted behavioral check. If there is no Morando check or it does not cover a rule, inspect the affected imports against that rule and report the verification limit.
5. When explaining a recommendation, link to the specific Morando documentation page or section that supports it. If the recommendation comes from this skill rather than the docs, label it as design guidance. Link related docs for context without implying they prescribe it.

## References

In the Morando repository, the sources are in `website/docs/`, including the validation table in `partials/validation-rules.html`. Elsewhere, use the published documentation: [Domains](https://www.morando.dev/domains), [Modules](https://www.morando.dev/modules), [Layers](https://www.morando.dev/layers), [Stacks](https://www.morando.dev/stacks), and [Validation](https://www.morando.dev/validation).
