import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Sparkles, ShoppingCart, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import promptCrafterImg from "@assets/generated_images/prompt_crafter_ai_tool_interface.png";
import cozyCaryPandaImg from "@assets/generated_images/e-commerce_shopping_cart_app.png";
import cyberChatImg from "@assets/generated_images/cyber_chat_messaging_app.png";

function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -8;
    const rotateYValue = ((x - centerX) / centerX) * 8;
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };
  
  return (
    <div 
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out'
      }}
    >
      {children}
    </div>
  );
}

interface Project {
  title: string;
  description: string;
  url: string;
  techStack: string[];
  icon: typeof Sparkles;
  image: string;
}

const projects: Project[] = [
  {
    title: "Prompt Crafter",
    description: "An AI-powered tool for crafting and refining prompts. Helps users create more effective prompts for large language models with structured templates and best practices.",
    url: "https://prompt-crafter.replit.app/",
    techStack: ["React", "TypeScript", "AI/LLM", "Tailwind CSS"],
    icon: Sparkles,
    image: promptCrafterImg,
  },
  {
    title: "Cozy Cart Panda",
    description: "A modern e-commerce application with a clean, intuitive shopping experience. Features product browsing, cart management, and a streamlined checkout flow.",
    url: "https://cozy-cart-panda.lovable.app",
    techStack: ["React", "TypeScript", "Lovable", "E-commerce"],
    icon: ShoppingCart,
    image: cozyCaryPandaImg,
  },
  {
    title: "Cyber Chat Webhook",
    description: "A real-time chat application with webhook integration capabilities. Enables seamless communication and automated message handling for various use cases.",
    url: "https://cyber-chat-webhook-kaliszkypeter.replit.app",
    techStack: ["React", "TypeScript", "WebSockets", "Webhooks"],
    icon: MessageSquare,
    image: cyberChatImg,
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
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 glow-text gradient-text">
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
            >
              <TiltCard className="h-full">
                <div className="animated-border glass-card rounded-2xl glow-border group flex flex-col h-full shine-sweep">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative overflow-hidden rounded-t-2xl"
                    data-testid={`link-project-image-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="aspect-video overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={`${project.title} preview`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <project.icon className="h-4 w-4 text-foreground/50" />
                        <h3 className="font-semibold text-lg group-hover:text-foreground transition-colors">
                          {project.title}
                        </h3>
                      </div>
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
                    
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-foreground/5">
                      {project.techStack.map((tech, techIndex) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className={`text-xs ${techIndex === 0 ? 'badge-teal' : 'bg-foreground/5 border-foreground/10'}`}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
