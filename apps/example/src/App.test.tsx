import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the shared package content', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Vite + React workspace baseline' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Shared package connected' })).toBeInTheDocument()
  })
})
