export type Project = {
  title: string;
  description: string;
  tech: string[];
  category: "web" | "programming" | "finance" | "data";
  status: "current" | "in-progress" | "completed";
  github?: string; // repository URL
  demo?: string; // live demo URL
};

// Add a project by appending an object here. It appears in the grid automatically.
export const projects: Project[] = [
  {
    title: "Personal portfolio",
    description:
      "This website, and my current project. It uses Next.js, TypeScript and Tailwind CSS and is deployed on Vercel. I built it with AI assistance while learning these tools.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    category: "web",
    status: "current",
  },
];
