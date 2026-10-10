---
title: Stacks
description:
  Every Morando layer belongs to one of four abstraction levels, Definitions,
  Operations, Presentation, and Bootstrap.
---

# Stacks

## Layers Belong to Stacks

The idea of a layer stack comes from a simple observation: all code in modern
front-end applications can be grouped into four broad levels of abstraction.
Each stack represents a distinct architectural responsibility and contains one
or more layers.

| Stack        | Description                                                                                                                             | Default layer |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Definitions  | The most abstract layer stack. It contains foundational, reusable types, and invariants that are independent of implementation details. | `defs`        |
| Operations   | The business logic layer. It holds operations, services, and utilities that do not involve presentation logic.                          | `ops`         |
| Presentation | The user interface layer. It contains components, views, and UI-specific code that present data and interact with users.                | `ui`          |
| Bootstrap    | The application entry layer. It wires together lower layers and bootstraps the app.                                                     | `main`        |

## Default Layers

Every Morando project needs to define at least one layer in each of the four
stacks. For convenience, Morando provides predefined default layers: `defs`,
`ops`, `ui`, and `main`.

Projects are free to customize their list of layers, but this is not standard
practice since Morando comes with predefined layer lists for the most popular
front-end frameworks. Choosing one that fits your project's tech stack should
remove the need to define custom layers altogether.

## Custom Layers Example

For educational purposes, let's pretend we want to define a custom layer list
for our React single-page web application. In such an application, it makes
sense to define `hooks` operations layer in addition to the default `ops` layer.
We might also want to have more specialized presentation layers instead of a
single general `ui` layer. Let's say we want our presentation layers to consist
of `components` and `pages`. The final list of layers could then look something
like this (from lowest to highest):

<table>
  <thead>
    <tr>
      <th>Stack</th>
      <th>Layer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Definitions</td>
      <td><code>defs</code></td>
    </tr>
    <tr>
      <td rowspan="2">Operations</td>
      <td><code>ops</code></td>
    </tr>
    <tr>
      <td><code>hooks</code></td>
    </tr>
    <tr>
      <td rowspan="2">Presentation</td>
      <td><code>components</code></td>
    </tr>
    <tr>
      <td><code>pages</code></td>
    </tr>
    <tr>
      <td>Bootstrap</td>
      <td><code>main</code></td>
    </tr>
  </tbody>
</table>
