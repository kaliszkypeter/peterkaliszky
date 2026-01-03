import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Sparkles, ShoppingCart, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import promptCrafterImg from "@assets/generated_images/prompt_crafter_ai_tool_interface.png";
import cozyCaryPandaImg from "@assets/generated_images/e-commerce_shopping_cart_app.png";
import cyberChatImg from "@assets/generated_images/cyber_chat_messaging_app.png";

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

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 sm:py-32 px-6 relative overflow-hidden">
      {/* Particle grid background */}
      <div className="absolute inset-0 particle-grid opacity-30" />
      
      <motion.div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--sage) / 0.3), transparent)" }}
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
            className="w-16 h-px mx-auto mb-6"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--sage) / 0.5), transparent)" }}
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
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
            >
              <TiltCard className="h-full">
                <div className="glass-card rounded-2xl animated-border sage-glow group flex flex-col h-full overflow-hidden">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative overflow-hidden"
                    data-testid={`link-project-image-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="aspect-video overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={`${project.title} preview`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-sm text-sage font-medium flex items-center gap-1">
                        Visit Site <ExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                  </a>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <project.icon className="h-4 w-4 text-sage" />
                        <h3 className="font-semibold text-lg group-hover:text-sage transition-colors">
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
                          className="opacity-60 group-hover:opacity-100 group-hover:text-sage transition-all h-8 w-8"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-sage/10">
                      {project.techStack.map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.1 + techIndex * 0.05 }}
                        >
                          <Badge className="text-xs badge-sage">
                            {tech}
                          </Badge>
                        </motion.div>
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
