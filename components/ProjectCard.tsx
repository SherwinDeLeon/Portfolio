import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";

const statusLabel = { current: "Current project", "in-progress": "In progress", completed: "Completed" } as const;

export default function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const { title, description, tech, category, status, github, demo } = project;
  const link = "inline-flex items-center gap-2 text-zinc-300 transition-colors hover:text-accent-300";
  return (
    <article className="flex h-full flex-col rounded-2xl glass-soft p-6 transition-colors hover:border-accent-400/40 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <span className="text-zinc-500">{category}</span>
        <span className={`rounded border px-2 py-1 ${status === "completed" ? "border-accent-400/40 text-accent-300" : "border-amber-400/40 text-amber-300"}`}>{statusLabel[status]}</span>
      </div>
      <h3 className={`mt-5 font-semibold text-bone ${featured ? "text-3xl sm:text-4xl" : "text-xl"}`}>{title}</h3>
      <p className="mt-3 max-w-2xl leading-relaxed text-zinc-400">{description}</p>
      <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-2">
        {tech.map((t) => (
          <li key={t} className="rounded border border-white/10 px-2.5 py-1 font-mono text-xs text-zinc-300">{t}</li>
        ))}
      </ul>
      {(github || demo) && (
        <div className="mt-6 flex gap-5 text-sm">
          {github && <a href={github} target="_blank" rel="noreferrer noopener" className={link}><Github size={16} aria-hidden="true" /> Code</a>}
          {demo && <a href={demo} target="_blank" rel="noreferrer noopener" className={link}><ExternalLink size={16} aria-hidden="true" /> Live demo</a>}
        </div>
      )}
    </article>
  );
}
