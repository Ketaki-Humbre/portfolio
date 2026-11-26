export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow: string
  title: string
  description?: string
  id?: string
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-2 font-mono text-xs font-medium uppercase tracking-[0.16em] text-brand">{eyebrow}</p>
      <h2 id={id} className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {description && <p className="mt-3 leading-relaxed text-ink-2">{description}</p>}
    </div>
  )
}
