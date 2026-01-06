import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Sparkles, ShoppingCart, MessageSquare, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import promptCrafterImg from "@assets/Screenshot_2026-01-03_at_23.14.50_1767478493952.png";
import cozyCaryPandaImg from "@assets/Screenshot_2026-01-03_at_23.15.34_1767478537367.png";
import cyberChatImg from "@assets/Screenshot_2026-01-03_at_23.23.17_1767479017881.png";
import hubImg from "@assets/focusbubble.jpeg";

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
    description: "I built this for myself to refine prompts using Anthropic’s prompting guidelines. It supports Google OAuth to unlock more free improvements, pulls a prompt library from a Notion database, and is built with Replit.",
    url: "https://prompt-crafter.replit.app/",
    techStack: ["Replit", "Notion", "OAuth"],
    icon: Sparkles,
    image: promptCrafterImg,
  },
  {
    title: "Tech Demo Shop",
    description: "I built this to run Barion test payments quickly without touching the API. It supports dark mode and can switch between Barion's test and production environments.",
    url: "https://cozy-cart-panda.lovable.app",
    techStack: ["Lovable", "Barion API"],
    icon: ShoppingCart,
    image: cozyCaryPandaImg,
  },
  {
    title: "Hub",
    description:
      "Built a prototype of an AI first collaboration platform. Collaboration platforms like Slack, Microsoft Teams, and Zoom keep us talking but don’t prioritize focus or streamline how we work, there’s no seamless way to balance connection with concentration. We deserve better—a digital workspace that cuts the clutter, boosts productivity, and keeps teams in sync—a platform that prioritizes focus while keeping us connected.",
    url: "https://focusbubble.lovable.app",
    techStack: ["Lovable", "Cursor"],
    icon: Bot,
    image: hubImg,
  },
  {
    title: "Neon Chat",
    description: "A chat app I built to test n8n integrations. It lets you set different conversation tones.",
    url: "https://cyber-chat-webhook-kaliszkypeter.replit.app",
    techStack: ["Replit", "n8n", "OpenAI API"],
    icon: MessageSquare,
    image: cyberChatImg,
  },
];

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Parallax for decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const decorY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="projects" ref={sectionRef} className="py-24 sm:py-32 px-6 relative overflow-hidden">
      {/* Parallax background decoration */}
      <motion.div 
        className="absolute -right-20 top-1/4 w-96 h-96 floating-orb floating-orb-neutral opacity-30"
        style={{ y: decorY }}
      />
      
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
            className="inline-flex items-center gap-2 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Bot className="h-4 w-4 text-muted-foreground" />
            <Badge 
              variant="secondary" 
              className="badge-teal"
            >
              AI Corner
            </Badge>
          </motion.div>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mb-6"
          />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 glow-text gradient-text">
            My Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Side projects and prototypes exploring vibe coding and AI-powered product building
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
                        aria-label={`Open ${project.title}`}
                      >
                        <Button 
                          size="icon" 
                          variant="ghost"
                          className="opacity-60 group-hover:opacity-100 transition-opacity"
                          aria-label={`Open ${project.title}`}
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">{`Open ${project.title}`}</span>
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
                          className="text-xs bg-foreground/5 border-foreground/10"
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
