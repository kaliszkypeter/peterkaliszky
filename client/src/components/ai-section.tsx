import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const aiProjects = [
  {
    id: "1",
    title: "AI-Powered Analytics Dashboard",
    description: "Built with Claude and Replit to visualize product metrics with natural language queries.",
    tags: ["Claude", "Replit", "Analytics"],
    link: "#",
  },
  {
    id: "2",
    title: "Automated User Research Synthesis",
    description: "Using NotebookLM and Gemini to analyze and summarize user interview transcripts.",
    tags: ["NotebookLM", "Gemini", "Research"],
    link: "#",
  },
  {
    id: "3",
    title: "Product Workflow Automation",
    description: "n8n workflows that automate repetitive product management tasks.",
    tags: ["n8n", "Automation", "Productivity"],
    link: "#",
  },
];

export function AISection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="ai" 
      className="py-24 sm:py-32 px-6 relative"
      ref={ref}
    >
      <motion.div 
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1 }}
      />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div 
            className="inline-flex items-center gap-2 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            <Badge 
              variant="secondary" 
              className="badge-teal"
            >
              AI Projects
            </Badge>
          </motion.div>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mb-6"
          />
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 glow-text gradient-text">
            AI Corner
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Projects built with AI tools and technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-card p-6 glow-border group"
              data-testid={`card-ai-project-${project.id}`}
            >
              <h3 className="font-semibold text-lg mb-3 group-hover:text-foreground transition-colors">
                {project.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs bg-foreground/5 border-foreground/10"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {project.link !== "#" && (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Project
                  </Button>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
