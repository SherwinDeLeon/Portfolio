import Section from "./Section";
import Timeline from "./Timeline";
import { affiliations, journey } from "@/data/journey";

export default function Journey() {
  return (
    <Section id="journey" title="Learning journey" intro="Milestones and community, listed by status rather than dates.">
      <Timeline steps={journey} />
      <dl className="mt-14 grid gap-4 sm:grid-cols-2">
        {affiliations.map((a) => (
          <div key={a.label} className="rounded-2xl glass-soft p-5">
            <dt className="font-mono text-xs text-zinc-500">{a.label}</dt>
            <dd className="mt-2 font-semibold text-bone">{a.title}</dd>
            <dd className="mt-1 text-sm text-zinc-400">{a.detail}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
