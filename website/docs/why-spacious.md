---
sidebar_position: 1
---

# Why Spacious

## The problems

Building large apps today still feels harder than it should be:

### Layers don’t scale

Most scalable architecture attempts are rooted in a traditional layered model. While this approach introduces some structure, it tends to become rigid and cumbersome as applications grow. Layers force a hierarchical thinking that works well in small scopes but struggles to accommodate complex, evolving systems.

### Frameworks leave you on your own

Frameworks like React, Vue, and others offer excellent building blocks for UIs, but they provide little to no support for organizing domain logic. Developers are left on their own to manage the growing complexity, often defaulting to ad-hoc solutions that vary wildly from one part of the system to another.

### We lack a common language, metrics, and tools

Even when teams recognize architectural problems, they face a deeper challenge: the lack of a shared language for describing architectural decisions. There are no simple metrics to evaluate whether a change improves or degrades the system’s structure. Tooling support for architecture is minimal, leaving teams to navigate complexity without clear guidance or feedback.

## The solution

To address these challenges, we need a different foundation — one that allows systems to grow without losing structure, and teams to collaborate without creating chaos.

The key is a **flexible Module abstraction**.

Instead of relying solely on rigid layers or informal coordinators, we organize code around Modules: independent, cohesive units that can contain logic, UI, state, and even other Modules.
Modules provide a natural way to express boundaries, manage complexity recursively, and evolve the system without unnecessary coupling.

With Modules as first-class citizens, **Spacious Architecture offers**:

- A **clear vocabulary** for discussing system design.
- An intuitive way to **measure and improve** architectural decisions (by looking at Module boundaries and dependencies).
- A path to **tooling** that can support and enforce good practices over time.
