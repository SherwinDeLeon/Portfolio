import Section from "./Section";
import { courses, languages } from "@/data/skills";

export default function Skills() {
  return (
    <Section id="foundation" title="Technical foundation" intro="The languages I’ve learned and the courses behind them. No ratings, just what’s done and what’s in progress.">
      <div className="grid gap-5 lg:grid-cols-2">
        <section aria-labelledby="langs-title" className="rounded-2xl glass-soft p-6">
          <h3 id="langs-title" className="font-semibold text-bone">Programming languages</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {languages.map((l) => (
              <li key={l} className="rounded-lg border border-accent-400/30 bg-accent-400/10 px-4 py-2 font-mono text-sm text-accent-200">{l}</li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="courses-title" className="rounded-2xl glass-soft p-6">
          <h3 id="courses-title" className="font-semibold text-bone">Learning</h3>
          <ul className="mt-4 space-y-4">
            {courses.map((c) => (
              <li key={c.name} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-bone">{c.name}</p>
                  <p className="text-sm text-zinc-400">{c.detail}</p>
                </div>
                <span className={`shrink-0 rounded border px-2 py-1 font-mono text-xs ${c.status === "completed" ? "border-accent-400/40 text-accent-300" : "border-amber-400/40 text-amber-300"}`}>
                  {c.status === "completed" ? "Completed" : "In progress"}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Section>
  );
}
