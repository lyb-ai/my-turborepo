# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository state

- This repository now has a working Turborepo baseline with one Vite + React + TypeScript app at `apps/example` and one shared React package at `packages/example`.
- Root tooling is `pnpm` + `turbo` with Node.js ESM (`"type": "module"`).
- There is still no README, no Cursor rules, and no Copilot instructions.

## Common commands

Use `pnpm` from the repository root.

- `pnpm install` - install all workspace dependencies.
- `pnpm dev` - run all workspace `dev` tasks through Turbo.
- `pnpm build` - build all workspaces in dependency order.
- `pnpm lint` - run ESLint across all workspaces.
- `pnpm test` - run Vitest across all workspaces.
- `pnpm typecheck` - run TypeScript checks across all workspaces.
- `pnpm --filter @repo/example-app test` - run only the app tests.
- `pnpm --filter @repo/example test` - run only the shared package tests.
- `pnpm --filter @repo/example-app exec vitest run src/App.test.tsx` - run a single app test file.
- `pnpm --filter @repo/example exec vitest run test/ExampleCard.test.tsx` - run a single package test file.
- `pnpm --filter @repo/example-app exec vite --host 127.0.0.1 --port 4173 --strictPort` - start the app on a fixed port for browser smoke tests.

## Workspace structure

- `apps/example` - Vite app entrypoint; imports `@repo/example` and validates workspace wiring in both runtime and tests.
- `packages/example` - shared React package; emits declarations with `tsc -p tsconfig.build.json` and library assets with `vite build`.
- `tsconfig.base.json` - shared strict TypeScript baseline for both workspaces.
- `eslint.config.mjs` - root flat ESLint config for TypeScript, React Hooks, and React Refresh rules.
- `turbo.json` - Turbo 2.x task graph using `tasks`, with `build` outputs cached from `dist/**`.

## Architecture notes

- App dev/test resolution uses a Vite alias and TS path mapping from `@repo/example` to `../../packages/example/src/index.ts` so the app can consume package source directly during local development.
- Package production output still comes from `packages/example/dist`, and `package.json` exports point at that built output.
- Both workspaces use Vitest with `jsdom`; setup files import `@testing-library/jest-dom/vitest`.
- Environment file changes invalidate Turbo cache via `.env*` and `**/.env*` in `globalDependencies`.

## Gotchas

- Turbo 2.x requires the root `packageManager` field in `package.json`; do not replace it with only `devEngines.packageManager`.
- Turbo's env glob must be `.env*` / `**/.env*`; `**.env` is an invalid glob.
- TypeScript 6 requires an explicit `rootDir` in `packages/example/tsconfig.build.json` when emitting declarations into `dist/`.
- For browser automation, prefer the fixed-port Vite command above instead of relying on `pnpm dev`, since Turbo persistent tasks are less predictable for one-off smoke checks.
