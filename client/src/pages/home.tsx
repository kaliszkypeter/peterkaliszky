import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Metrics } from "@/components/metrics";
import { ExperienceSection } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { BlogPreview } from "@/components/blog-preview";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Metrics />
        <ExperienceSection />
        <Skills />
        <Projects />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
