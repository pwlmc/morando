---
status: "accepted"
date: 2025-11-30
---

# Use JSON Schema to Describe and Version Configuration Schema

## Context and Problem Statement

Morando needs to validate user configuration files to ensure their validitity.

**The key question is: Should Morando maintain an external schema format to describe valid configuration structure, and if so, which format?**

## Considered Options

### Option 1: No Schema Format

Validate configuration through hardcoded validation logic without an external schema.

**Pros:**

- **Simplicity**: No additional files to maintain
- **Performance**: Direct validation without schema parsing
- **Flexibility**: Can implement custom validation logic easily

**Cons:**

- **Maintenance Burden**: Validation logic scattered across codebase
- **No Documentation**: Schema serves as living documentation
- **No Portability**: Each language will have to have it's own implementation of the schema validation

### Option 2: JSON Schema

Use JSON Schema (Draft-07 or later) to define configuration structure and validation rules.

**Pros:**

- **Excellent Tooling**: Widespread IDE support for validation and autocompletion
- **Rich Validation**: Supports complex validation rules, patterns, and constraints
- **Cross-Platform**: Libraries available in virtually every programming language
- **Type Generation**: Tools can generate TypeScript/other language types
- **Self-Documenting**: Schema serves as formal API documentation

**Cons:**

- **Complexity**: Can become verbose for complex schemas
- **Learning Curve**: Developers need to understand JSON Schema syntax

### Option 3: JSON Type Definition (JTD)

Use the simpler JTD format for schema definition.

**Pros:**

- **Simplicity**: Much simpler syntax than JSON Schema
- **Performance**: Faster parsing and validation
- **Type-Focused**: Designed specifically for type generation

**Cons:**

- **Limited Adoption**: Fewer tools and IDE integrations
- **Less Expressive**: Cannot define complex validation rules
- **Immature Ecosystem**: Smaller community and fewer resources

## Decision Outcome

**Morando will use JSON Schema to describe and validate configuration files.**

We chose JSON Schema because it provides the best balance of functionality, tooling support, and ecosystem maturity.
