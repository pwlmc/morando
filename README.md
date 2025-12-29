# Morando

Architecture framework for the JavaScript ecosystem.

## Introduction

**Morando** project is an architectural framework with tools that work much like a linter:
It tells you when you’ve broken the fundamental rules of the Morando architecture.

However, it’s **not** deterministic. Given the same codebase, it’s not designed to produce a single “true” result,
because there is no single proper form for your project.
You have to decide what works best for you and your organization.

Instead, Morando is built on a well-defined set of ideas: **modules** and **layers**,
which allow it to provide metrics to evaluate whether a given change is for better or worse.
In other words, it won’t tell you _where_ your destination is, but it can tell you whether you’re heading _in the right direction_.
