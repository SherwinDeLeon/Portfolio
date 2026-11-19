import Section from "./Section";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <Section id="projects" title="Projects" intro="My current project. Programming, finance and data projects will be added as I build them.">
      <ul className="grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <li key={p.title} className={i === 0 ? "sm:col-span-2" : ""}>
            <ProjectCard project={p} featured={i === 0} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
