# Layer Groups

## Layers Belong to Groups

The idea of a layer group comes from a simple observation: all code in modern
front-end applications can be grouped into four broad levels of abstraction.
They are:

| Layer Group  | Description                                                                                                                             | Default layer |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Definitions  | The most abstract layer group. It contains foundational, reusable types, and invariants that are independent of implementation details. | `defs`        |
| Operations   | The business logic layer. It holds operations, services, and utilities that do not involve presentation logic.                          | `ops`         |
| Presentation | The user interface layer. It contains components, views, and UI-specific code that present data and interact with users.                | `ui`          |
| Bootstrap    | The application entry layer. It wires together lower layers and bootstraps the app.                                                     | `main`        |

Every Morando project needs to define four layers at minimum: at least one layer
in each of the four layer groups.

## Default Layers

Each layer group needs to have at least one layer defined. For convenience,
Morando provides predefined default layers - one for each group. Those layers
are: `defs`, `ops`, `ui`, and `main`.

Projects are free to customize their list of layers, but this is not standard
practice. Morando comes with predefined layer lists for the most popular
front-end frameworks. Choosing one that fits your project's tech stack should
remove the need to define custom layers altogether.

## Custom Layers Example

For educational purposes, let's pretend we want to define a custom layer list
for our React single-page web application. In such an application, it makes
sense to define an additional `hooks` operations layer in addition to the
default `ops` layer. We might also want to have more specialized presentation
layers instead of a single general `ui` layer. Let's say we want our
presentation layers to consist of `components` and `pages`. The final list of
layers could then look something like this (from lowest to highest):

| Layer name   | Layer Group  |
| ------------ | ------------ |
| `defs`       | Definitions  |
| `ops`        | Operations   |
| `hooks`      | Operations   |
| `components` | Presentation |
| `pages`      | Presentation |
| `main`       | Bootstrap    |
