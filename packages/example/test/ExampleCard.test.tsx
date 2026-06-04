import { render, screen } from '@testing-library/react'
import { ExampleCard } from '../src/ExampleCard'

describe('ExampleCard', () => {
  it('renders the provided content', () => {
    render(
      <ExampleCard
        title="Shared package connected"
        description="packages/example is available to the app workspace."
      />,
    )

    expect(screen.getByText('workspace package')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Shared package connected' })).toBeInTheDocument()
    expect(
      screen.getByText('packages/example is available to the app workspace.'),
    ).toBeInTheDocument()
  })
})
