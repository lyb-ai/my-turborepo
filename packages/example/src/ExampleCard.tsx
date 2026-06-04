import './example-card.css'

type ExampleCardProps = {
  title: string
  description: string
}

export function ExampleCard({ title, description }: ExampleCardProps) {
  return (
    <article className="example-card">
      <div className="example-card__badge">workspace package</div>
      <h2>{title}</h2>
      <p>{description}</p>
    </article>
  )
}
