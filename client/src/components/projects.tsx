import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Sparkles, ShoppingCart, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  description: string;
  url: string;
  techStack: string[];
  icon: typeof Sparkles;
}

const projects: Project[] = [
  {
    title: "Prompt Crafter",
    description: "An AI-powered tool for crafting and refining prompts. Helps users create more effective prompts for large language models with structured templates and best practices.",
    url: "https://prompt-crafter.replit.app/",
    techStack: ["React", "TypeScript", "AI/LLM", "Tailwind CSS"],
    icon: Sparkles,
  },
  {
    title: "Cozy Cart Panda",
    description: "A modern e-commerce application with a clean, intuitive shopping experience. Features product browsing, cart management, and a streamlined checkout flow.",
    url: "https://cozy-cart-panda.lovable.app",
    techStack: ["React", "TypeScript", "Lovable", "E-commerce"],
    icon: ShoppingCart,
  },
  {
    title: "Cyber Chat Webhook",
    description: "A real-time chat application with webhook integration capabilities. Enables seamless communication and automated message handling for various use cases.",
    url: "https://cyber-chat-webhook-kaliszkypeter.replit.app",
    techStack: ["React", "TypeScript", "WebSockets", "Webhooks"],
    icon: MessageSquare,
  },
];

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 sm:py-32 px-6 relative overflow-hidden">
      <motion.div 
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1 }}
      />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mb-6"
          />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 glow-text">
            Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Side projects and experiments I've built to explore new technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-card p-6 rounded-2xl glow-border group flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <motion.div 
                  className="p-3 rounded-xl bg-foreground/5 border border-foreground/10 group-hover:bg-foreground/10 transition-colors duration-300"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <project.icon className="h-6 w-6 text-foreground/70" />
                </motion.div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-project-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Button 
                    size="icon" 
                    variant="ghost"
                    className="opacity-60 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </div>
              
              <h3 className="font-semibold text-lg mb-2 group-hover:text-foreground transition-colors">
                {project.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-foreground/5">
                {project.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-xs bg-foreground/5 border-foreground/10"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
