---
status: "accepted"
date: 2025-11-30
---

# Don't Support Configuration Extending

## Context and Problem Statement

Templates are one of the core ideas of Morando architecture, and the command line tool needs to be able to initialize an empty project with a pre-selected template of the user's choosing.

We need to assume that the config schema will change over time. The same applies to templates; it is very likely that they will evolve. This brings a question: **should Morando support configuration extending?**

This decision impacts:

- Configuration reuse across projects
- How difficult it is to debug and understand the final configuration
- Possible migration strategies when config schema or templates change

## Considered Options

### Option 1: Support Configuration Extending (ESLint-style)

Implement an `extends` field that allows configurations to inherit from other config files, similar to how ESLint handles configuration inheritance.

**Pros:**

- **Concise**: When the config file is large, extending allows hiding default configuration from the end user
- **Reusability**: Teams can create shared base configurations for common patterns

**Cons:**

- **Resolution Complexity**: Requires implementing config merging logic and handling conflicts
- **Debugging Difficulty**: Makes it harder to understand the final config when spread across multiple files
- **Performance Impact**: Introduces additional file I/O and processing during config resolution
- **Version Management**: Changes to base configs can break dependent projects unexpectedly

### Option 2: No Configuration Extending

Keep configuration files completely self-contained with no inheritance mechanism.

**Pros:**

- **Predictability**: What you see is what you get - no hidden inheritance
- **Performance**: Faster config loading with no resolution overhead
- **Debugging**: Makes it easy to understand and debug configuration issues
- **Independence**: Projects are not coupled to external config dependencies

**Cons:**

- **Duplication**: Common settings must be copied across projects
- **Maintenance Burden**: Updates to common patterns require changes in multiple places
- **Inconsistency Risk**: Teams may diverge from organizational standards over time

## Decision Outcome

Morando will NOT support configuration extending.

Extendable configs make sense for projects like ESLint, where the number of configuration options reaches into the hundreds. Without configuration extending, such configuration files would be overwhelming and would quickly become unmaintainable.

However, extendable configs are harder to debug and reduce configuration transparency. Morando aims to be simple and predictable, prioritizing explicit configuration over convenience features that add complexity.

By keeping configurations self-contained, we ensure that developers can easily understand their project's architectural rules without needing to hunt through multiple files or deal with inheritance chains.

### Consequences

**1. The number of configuration options for Morando should always remain relatively small**

Since we cannot hide configuration complexity behind a common root config, Morando configurations must always stay small to remain readable and maintainable.

**2. Provide automated config migration tools**

For major configuration schema or template changes, the Morando toolkit should provide automated config migration tools.
