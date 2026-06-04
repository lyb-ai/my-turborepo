# my-turborepo

一个基于 `pnpm` + `turbo` 的 monorepo 基线仓库。

当前仓库包含：

- `apps/example`：一个 Vite + React + TypeScript 应用
- `packages/example`：一个共享 React package

## 仓库约定

### Workspace 目录

- `apps/*`：应用型子项目
- `packages/*`：共享包、组件库、工具库

### 根命令

在仓库根目录执行：

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm typecheck
```

### 子项目接入最低要求

无论你是“完全新建”还是“复制现有 example”，新子项目都建议提供以下脚本，便于被 Turbo 统一调度：

- `dev`
- `build`
- `lint`
- `test`
- `typecheck`

### 共享包依赖约定

如果某个 app 要依赖本仓库内的 package，请在 app 的 `package.json` 中使用：

```json
{
  "dependencies": {
    "@repo/your-package": "workspace:*"
  }
}
```

如果 app 在本地开发时需要直接消费 package 源码，而不是只消费构建产物，还需要同步补充：

- `tsconfig.json` 的 `paths`
- `vite.config.ts` 的 `resolve.alias`
- `vitest.config.ts` 的 `resolve.alias`

示例：

```json
{
  "compilerOptions": {
    "paths": {
      "@repo/your-package": ["../../packages/your-package/src/index.ts"]
    }
  }
}
```

## 新增子项目的两种标准流程

| 场景 | 推荐方案 |
| --- | --- |
| 想切换前端框架、重新选择工程结构 | 方案 1：完全新建子项目并接入 |
| 想沿用当前仓库的 Vite + React + TypeScript 规范快速开始 | 方案 2：复制现有 example |

---

## 方案 1：完全新建子项目并接入

适合以下情况：

- 想使用新的前端框架或官方脚手架
- 不想继承 `example` 的目录和实现细节
- 希望完全按照当前业务需求组织代码

### 1.1 新建一个 app

1. 在 `apps/<name>` 下使用目标框架的官方脚手架创建项目。
2. 不要让脚手架初始化新的 git 仓库；当前仓库已经是一个 monorepo。
3. 确认新项目的 `package.json` 已纳入 workspace，并设置清晰的包名，例如：
   - `@repo/admin-app`
4. 补齐或对齐以下脚本：
   - `dev`
   - `build`
   - `lint`
   - `test`
   - `typecheck`
5. 回到仓库根目录执行 `pnpm install`，统一安装依赖并更新 lockfile。
6. 如果该 app 依赖本仓库的共享 package：
   - 在 `dependencies` 中使用 `workspace:*`
   - 根据需要补充 `tsconfig.json`、`vite.config.ts`、`vitest.config.ts` 中的本地源码 alias
7. 单项目验证：

```bash
pnpm --filter @repo/your-app dev
pnpm --filter @repo/your-app lint
pnpm --filter @repo/your-app test
pnpm --filter @repo/your-app typecheck
pnpm --filter @repo/your-app build
```

8. 最后执行根级验证，确认已正确接入 monorepo：

```bash
pnpm lint
pnpm test
pnpm typecheck
pnpm build
```

### 1.2 新建一个 package

1. 在 `packages/<name>` 下创建新 package。
2. 定义清晰的包名，例如：
   - `@repo/ui`
   - `@repo/utils`
3. 建议提供统一脚本：
   - `dev`
   - `build`
   - `lint`
   - `test`
   - `typecheck`
4. 如果这是一个可复用构建产物的 package，建议将产物输出到 `dist/`，便于与当前 Turbo 配置保持一致。
5. 如果这是一个 React 组件包，建议将 `react` / `react-dom` 作为 `peerDependencies`。
6. 回到仓库根目录执行 `pnpm install`。
7. 单项目验证：

```bash
pnpm --filter @repo/your-package lint
pnpm --filter @repo/your-package test
pnpm --filter @repo/your-package typecheck
pnpm --filter @repo/your-package build
```

8. 如果有 app 依赖该 package，再补充 app 侧的 `workspace:*` 依赖和别名配置。

### 1.3 使用新框架时的额外检查

如果你选择的不是当前 `example` 使用的 Vite + React + TypeScript 组合，请额外确认以下几点：

1. **构建输出目录**
   - 当前 Turbo 默认缓存 `dist/**`
   - 如果你的框架输出目录不是 `dist`，需要同步调整根 `turbo.json`

2. **Lint 配置**
   - 当前根 ESLint 配置偏向 TypeScript + React
   - 如果引入 Vue / Svelte / Astro / Next.js 等新栈，可能需要补充框架对应的 lint 配置

3. **TypeScript 配置**
   - 可以优先保留官方脚手架生成的配置
   - 再逐步向仓库统一规范收敛，而不是一开始强行完全套用现有 app 的配置

---

## 方案 2：复制现有 example

适合以下情况：

- 想快速开始
- 希望沿用当前仓库已有技术栈
- 想尽量少改根配置

### 2.1 复制 app 模板

1. 复制目录：
   - `apps/example` → `apps/<name>`
2. 修改 `package.json`：
   - 更新 `name`
   - 按需增删依赖
3. 替换业务代码：
   - `src/App.tsx`
   - `src/main.tsx`
   - `src/styles.css`
   - 测试文件
4. 如果不再使用 `@repo/example`，删除或替换以下配置中的别名：
   - `tsconfig.json`
   - `vite.config.ts`
   - `vitest.config.ts`
5. 回到仓库根目录执行：

```bash
pnpm install
```

6. 单项目验证：

```bash
pnpm --filter @repo/your-app dev
pnpm --filter @repo/your-app lint
pnpm --filter @repo/your-app test
pnpm --filter @repo/your-app typecheck
pnpm --filter @repo/your-app build
```

### 2.2 复制 package 模板

1. 复制目录：
   - `packages/example` → `packages/<name>`
2. 修改 `package.json`：
   - 更新 `name`
   - 更新导出入口
   - 根据实际情况保留或删除 React 相关 `peerDependencies`
3. 替换实现代码：
   - `src/index.ts`
   - `src/*`
   - `test/*`
4. 确认构建产物仍输出到 `dist/`。
5. 回到仓库根目录执行：

```bash
pnpm install
```

6. 单项目验证：

```bash
pnpm --filter @repo/your-package lint
pnpm --filter @repo/your-package test
pnpm --filter @repo/your-package typecheck
pnpm --filter @repo/your-package build
```

7. 如果该 package 需要被 app 本地直接消费，再补充 app 侧：
   - `workspace:*` 依赖
   - `tsconfig.json` 的 `paths`
   - `vite.config.ts` 的 `resolve.alias`
   - `vitest.config.ts` 的 `resolve.alias`

---

## 推荐决策

### 优先选“完全新建并接入”

当你：

- 想换框架
- 想用官方脚手架
- 想从一开始就按新的业务模型搭建项目

### 优先选“复制 example”

当你：

- 继续使用当前技术栈
- 想最快落地一个新 app / package
- 不希望额外调整 monorepo 基础设施

---

## 提交前检查清单

新增子项目后，提交前至少确认：

- [ ] 新子项目位于 `apps/*` 或 `packages/*`
- [ ] 子项目脚本包含 `dev/build/lint/test/typecheck`
- [ ] 根目录 `pnpm install` 可正常执行
- [ ] 单项目 `lint/test/typecheck/build` 可通过
- [ ] 根目录 `pnpm lint` / `pnpm test` / `pnpm typecheck` / `pnpm build` 可通过
- [ ] 没有把本地临时文件、截图或 `.claude/settings.local.json` 之类的本地调试产物提交进仓库

如果只是想快速起一个同栈项目，优先复制 `example`；如果要重新选择前端框架或工程结构，优先走“完全新建并接入”的流程。
