<div class="hero">
  <h1 class="hero-title">Morando</h1>
  <p class="hero-tagline">Architecture Linter For Front-End Applications</p>
</div>

<style scoped>
.hero {
  text-align: center;
  padding: 2rem 0 7rem;
}
.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin: 0 0 0.75rem;
  line-height: 1.1;
}
.hero-tagline {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
  margin: 0;
}
</style>

# Why Morando?

## Problem statement

Building large apps today still feels harder than it should be:

#### Layers alone don’t scale well

Most scalable architecture attempts are rooted in a traditional layered model.
While this approach introduces some structure, it tends to become rigid and
cumbersome as applications grow. Layers force a hierarchical thinking that works
well in small scopes but struggles to accommodate complex, evolving systems.

#### Frameworks leave you on your own

Frameworks like React, Vue, and others offer excellent building blocks for UIs,
but they provide little to no support for organizing domain logic. Developers
are left on their own to manage the growing complexity, often defaulting to
ad-hoc solutions that vary wildly from one part of the system to another.

#### Lack of common language, metrics, and tools

Even when teams recognize architectural problems, they face a deeper challenge:
the lack of a shared language for describing architectural decisions. There are
no simple metrics to evaluate whether a change improves or degrades the system’s
structure. Tooling support for architecture is minimal, leaving teams to
navigate complexity without clear guidance or feedback.

## The solution

To address these challenges, we need a different foundation. One that allows
systems to grow without losing structure, and teams to collaborate without
creating chaos.

The key is to merge Layers with a **flexible Module abstraction**. Modules
provide a natural way to express boundaries, manage complexity recursively, and
evolve the system without unnecessary coupling.

With merging **Layers** and **Modules**, Morando architecture offers:

- A **clear vocabulary** for discussing system design.
- An intuitive way to **measure and improve** architectural decisions.
- A **tooling** that support and enforce good practices all the time.

## Morando Design Principles

#### 1. Minimum Overhead

Strive to minimize the entry barrier for developers. The architecture avoids
introducing unnecessary files or classes that consumers must create or extend,
ensuring a lightweight and intuitive experience.

#### 2. Convention Over Definition

Morando architecture emphasizes conventions and code inspection over rigid
definitions. By relying on inspecting the code and enforcing rules dynamically,
we reduce the need for predefined templates, fostering flexibility and
simplicity.

#### 3. Natural Codebase Evolution

The architecture supports rapid code creation while encouraging good practices.
It allows for easy refactoring and correction of mistakes with minimal
disruption, enabling the codebase to evolve naturally over time.

#### 4. Maximized Testability

Testing is a cornerstone of quality. The architecture promotes splitting code
into smaller, testable units, making it easier to write and maintain robust unit
tests, even for challenging front-end scenarios.

#### 5. Metric Driven

To ensure adherence to architectural rules, the architecture facilitates the
addition of fitness functions. These functions validate the correctness of the
codebase, ensuring it aligns with the intended design principles.

#### 6. Limited Nesting

While nesting can aid discoverability, excessive nesting can lead to silos and
hinder maintainability. The architecture strikes a balance, allowing for
efficient code organization without compromising long-term usability.

#### 7. Clear Ownership

In large projects, clear ownership of code is essential for velocity and
maintenance. The architecture defines entities that make it straightforward to
assign and determine ownership, streamlining collaboration and accountability.

By adhering to these principles, the React Modular Architecture aims to provide
a robust framework that empowers developers to build scalable and maintainable
applications with ease.
