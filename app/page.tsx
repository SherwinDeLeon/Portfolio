import Mesh from "@/components/Mesh";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";
import { site } from "@/data/site";

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-accent-400 focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <Mesh />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Skills />
        <Journey />
        <Contact />
      </main>
      <footer className="px-5 pb-28 pt-8 text-sm sm:pb-8 text-zinc-500 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>Built with Next.js, TypeScript and Tailwind CSS. Deployed on Vercel.</p>
        </div>
      </footer>
    </>
  );
}
