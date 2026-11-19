const items = ["Python", "C", "CS50P completed", "CS50x in progress", "Software engineering", "Financial technology", "Trading systems"];

export default function Marquee() {
  return (
    <div aria-hidden="true" className="glass mx-3 my-6 overflow-hidden rounded-full py-3 sm:mx-6 font-mono text-xs text-zinc-400 sm:text-sm">
      <div className="flex w-max animate-[marquee_50s_linear_infinite] whitespace-nowrap">
        {[0, 1].map((k) => (
          <ul key={k} className="flex shrink-0 items-center gap-8 pr-8">
            {items.map((t) => (
              <li key={t} className="flex items-center gap-8">
                <span>{t}</span>
                <span className="h-1.5 w-1.5 rounded-sm bg-accent-400/70" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
