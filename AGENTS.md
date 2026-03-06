# Morando

Architecture linter for the JavaScript ecosystem.

## Project Structure

Monorepo using npm workspaces:

- `packages/cli/` - `@morando/cli`, the core CLI tool
- `website/` - Docusaurus documentation site
- `decisions/` - Architecture Decision Records (ADRs)

## CLI Package (`packages/cli`)

### Tech Stack

- **Runtime:** Node.js (ESM)
- **Language:** TypeScript (strict mode, `verbatimModuleSyntax`)
- **CLI framework:** yargs
- **Validation:** AJV (JSON Schema)
- **FP utilities:** ok-fp (`Either`, `Option` monads)
- **Build:** tsdown
- **Test:** vitest (with `@vitest/coverage-v8`)
- **Lint:** oxlint (config in `.oxlintrc.json`)

### Commands

```bash
npm run lint          # Run oxlint
npm run typecheck     # Run tsc --noEmit
npm run test          # Run vitest
npm run build         # Build with tsdown
```

All commands run from `packages/cli/`.

### Key Conventions

- Config file name: `.morandorc.json`
- Template files live in `packages/cli/templates/`, named `{name}-v{version}.json`
- Tests are co-located with source files using `.spec.ts` suffix
- Imports use `.js` extensions (ESM convention for TypeScript)
- Use `vi.mock()` for mocking in tests; mocks are declared at module level

### CI Pipeline (GitHub Actions)

Runs on every push: `lint`, `typecheck`, `test`, `build` - all in parallel after `install-dependencies`.

## ok-fp

This project follows a functional style. `ok-fp` is the primary library for controlling computation flow using effect data types (`Either`, `Option`, etc.).

The `ok-fp` library is maintained by the same team. If its API could offer a better consumer experience for this project, flag it and suggest improvements.

## Agent Guidelines

### Permissions

- **Allowed without asking:** non-mutating npm scripts (`lint`, `typecheck`, `test`, `build`), reading project files, creating commits.
- **Requires permission:** `npm install` or any command that modifies project dependencies, pushing to origin, reading or modifying files outside the project directory.
- **Strictly forbidden without permission:** accessing or modifying files outside the project.

### Quality Assurance

After a batch of code changes, verify that QA scripts pass (`lint`, `typecheck`, `test`) and that packages build correctly before considering the work done.

### General Rules

- Read existing code before modifying it. Understand the patterns in use.
- Keep changes minimal and focused. Do not refactor surrounding code unless asked.
- Follow existing conventions. Do not introduce new patterns without discussion.

### Code Style

- TypeScript strict mode. All compiler options in `packages/cli/tsconfig.json` are intentional.
- Use `ok-fp` monads (`Either`, `Option`) for error handling where the codebase already does. Do not mix with try/catch in the same flow.
- ESM imports with `.js` extensions (e.g., `import foo from "./foo.js"`).
- No default exports except where already established (e.g., `attachInitCommand`, `listTemplates`, `readConfig`).
- Prefer `const` and functional patterns. Avoid classes unless modeling domain errors (see `defs.ts` files).

### Writing Style

- Be strict and concise. No filler, no fluff.
- Never use em dashes in docs, comments, or commit messages. Use commas, periods, or parentheses instead.

### Testing

- Co-locate tests with source: `foo.ts` -> `foo.spec.ts`
- Use vitest (`describe`, `it`, `expect`, `vi`)
- Mock at module level with `vi.mock()`, then `vi.mocked()` for type-safe access
- `clearMocks: true` is set globally in vitest config. No need to manually reset mocks.
- Test behavior, not implementation. Prefer testing public API surfaces.

### File Organization

- Domain types go in `defs.ts` files within their feature directory
- Error classes are defined alongside the types they relate to
- Utility functions go in `utils/` directory

### Commits & PRs

- Use conventional commits (e.g., `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`).
- One logical change per commit.
- PR descriptions should explain the "why", not just the "what".
- CI must pass: lint, typecheck, test, build.
