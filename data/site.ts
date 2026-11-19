export type ContactLink = { label: "GitHub" | "LinkedIn" | "Facebook" | "Email"; value: string; href: string };

export const site = {
  name: "Rohn Sherwin De Leon",
  title: "Computer Science student",
  headline: "Building at the intersection of code and finance.",
  tagline: "First-year Computer Science student exploring software engineering, programming, and financial technology.",
  meta: "BS Computer Science, year 1 · TUP Manila",
  description:
    "Portfolio of Rohn Sherwin De Leon, a first-year BS Computer Science student at TUP Manila exploring software engineering and financial technology.",
};

// Shown in the hero, navigation and Contact section. Add an Email entry here when you want one.
export const contacts: ContactLink[] = [
  { label: "GitHub", value: "github.com/SherwinDeLeon", href: "https://github.com/SherwinDeLeon" },
  { label: "LinkedIn", value: "linkedin.com/in/rohn-sherwin-de-leon-8842b540b", href: "https://www.linkedin.com/in/rohn-sherwin-de-leon-8842b540b" },
  { label: "Facebook", value: "facebook.com/rohn.sherwin.de.leon.2024", href: "https://www.facebook.com/rohn.sherwin.de.leon.2024" },
];
