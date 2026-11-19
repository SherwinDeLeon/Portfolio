import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = { id: string; title: string; intro?: string; children: ReactNode };

/** A rounded glass sheet floating over the mesh backdrop. */
export default function Section({ id, title, intro, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="glass mx-3 my-6 rounded-[2rem] sm:mx-6 lg:my-10">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16 lg:py-24">
        <header className="lg:sticky lg:top-28 lg:self-start">
          <h2 id={`${id}-title`} className="text-4xl font-medium tracking-[-0.035em] text-bone sm:text-5xl">{title}</h2>
          {intro && <p className="mt-4 max-w-sm leading-relaxed text-zinc-400">{intro}</p>}
        </header>
        <Reveal>{children}</Reveal>
      </div>
    </section>
  );
}
