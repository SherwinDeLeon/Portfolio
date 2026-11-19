import { Activity, Landmark, Terminal } from "lucide-react";
import Section from "./Section";
import SweptText from "./SweptText";

const focus = [
  { Icon: Terminal, title: "Software engineering", text: "Learning to design and write clear, working programs.", tone: "text-accent-300 bg-accent-400/10 border-accent-400/30" },
  { Icon: Landmark, title: "Financial technology", text: "Exploring how technology shapes payments, markets and money.", tone: "text-accent2-300 bg-accent2-400/10 border-accent2-400/30" },
  { Icon: Activity, title: "Trading systems", text: "Curious about the engineering behind financial and trading systems.", tone: "text-amber-300 bg-amber-400/10 border-amber-400/30" },
];

const about = [
  "I’m a first-year BS Computer Science student at the Technological University of the Philippines – Manila. I’ve completed Harvard’s CS50P, Introduction to Programming with Python, and I’m currently taking CS50x to strengthen my understanding of computer science fundamentals.",
  "I’m interested in software engineering, financial technology, and the engineering behind financial and trading systems. I’m also a member of Google Developer Groups on Campus at TUP Manila.",
];

export default function About() {
  return (
    <Section id="about" title="About" intro="Early in the journey, building solid foundations.">
      <SweptText paragraphs={about} className="max-w-2xl space-y-5 text-lg leading-relaxed text-zinc-100" />
      <ul className="mt-12 grid gap-4 sm:grid-cols-3">
        {focus.map(({ Icon, title, text, tone }) => (
          <li key={title} className="rounded-2xl glass-soft p-5">
            <span className={`grid h-10 w-10 place-items-center rounded-xl border ${tone}`}><Icon size={18} aria-hidden="true" /></span>
            <h3 className="mt-4 font-semibold text-bone">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
