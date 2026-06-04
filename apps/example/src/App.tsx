import { ExampleCard } from '@repo/example'

export default function App() {
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Turborepo starter</p>
        <h1>Vite + React workspace baseline</h1>
        <p className="summary">
          This app consumes a shared workspace package to validate monorepo wiring,
          build orchestration, linting, and tests.
        </p>
      </section>
      <ExampleCard
        title="Shared package connected"
        description="packages/example is built, imported, and tested alongside apps/example."
      />
    </main>
  )
}
