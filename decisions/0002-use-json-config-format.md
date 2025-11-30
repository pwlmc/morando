---
status: "accepted"
date: 2025-11-30
---

# Use JSON Configuration Format

## Context and Problem Statement

Morando needs a configuration format that is simple, portable, and easy to parse across different programming languages. The configuration format will define architectural layers, file matching patterns, and validation rules.

**The key question is: What configuration format should Morando use for `.morandorc` files?**

## Considered Options

### Option 1: JSON Format

Use standard JSON for configuration files (`.morandorc.json`).

**Pros:**

- **Universal Support**: JSON parsers exist in every programming language
- **Simplicity**: Pure data format with no executable logic
- **Tooling**: Excellent IDE support with JSON Schema validation
- **Security**: Cannot execute arbitrary code during parsing
- **Portability**: Easy to implement Morando in any language

**Cons:**

- **No Comments**: Standard JSON doesn't support comments (though JSONC can be used)
- **Limited Expressions**: Cannot compute values dynamically
- **Verbosity**: Can be more verbose than other formats

### Option 2: JavaScript/TypeScript Configuration

Use executable JS/TS files that export configuration objects (`.morandorc.js`).

**Pros:**

- **Flexibility**: Can compute configuration values dynamically
- **Familiarity**: Most web developers are comfortable with JS/TS
- **Comments**: Native support for comments and documentation
- **Type Safety**: TypeScript provides compile-time validation

**Cons:**

- **Security Risk**: Can execute arbitrary code during configuration loading
- **Language Dependency**: Requires JavaScript runtime for parsing
- **Portability Issues**: Harder to implement Morando in other languages (Rust, Go, etc.)
- **Complexity**: Allows for complex logic that makes configs harder to understand

## Decision Outcome

**Morando will use JSON format for configuration files.**

We chose JSON because we prioritize simplicity, security, and cross-language portability over dynamic configuration capabilities.

JSON ensures that Morando can be implemented in any programming language (Rust, Go, Python, etc.) without requiring a JavaScript runtime. While JavaScript/TypeScript offers more flexibility, architectural configuration should be declarative and explicit rather than programmatic.
