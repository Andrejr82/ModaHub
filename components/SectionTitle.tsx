interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: string;
}

export function SectionTitle({ eyebrow, title, description, action }: SectionTitleProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.28em] text-clay">{eyebrow}</p> : null}
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink md:text-4xl">{title}</h2>
        {description ? <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-600">{description}</p> : null}
      </div>
      {action ? <span className="text-sm font-semibold uppercase tracking-[0.2em] text-ink">{action}</span> : null}
    </div>
  );
}
