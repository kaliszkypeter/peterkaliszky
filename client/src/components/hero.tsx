import { useState, useEffect, useRef, type MouseEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

function MouseFollowText({ children, className }: { children: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePos({ x: -1000, y: -1000 });
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block cursor-default ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground">
        {children}
      </span>
      <span
        className="absolute inset-0 z-20 bg-clip-text text-transparent pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage: `radial-gradient(circle var(--name-hover-radius) at ${mousePos.x}px ${mousePos.y}px, hsl(var(--teal) / 0.55), transparent var(--name-hover-falloff))`,
          opacity: isHovering ? "var(--name-hover-opacity)" : 0,
        }}
      >
        {children}
      </span>
    </div>
  );
}

const roles = [
  "Product Owner",
  "Payment Expert",
  "AI Enthusiast",
  "Vibe Coder",
];

export function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);
  const y = useTransform(scrollY, [0, 400], [0, 50]);
  
  // Parallax transforms for background elements
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);
  const orb1Y = useTransform(scrollY, [0, 500], [0, 80]);
  const orb2Y = useTransform(scrollY, [0, 500], [0, 120]);
  const orb3Y = useTransform(scrollY, [0, 500], [0, 60]);
  const dotGridY = useTransform(scrollY, [0, 500], [0, 40]);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentRole.length) {
            setDisplayText(currentRole.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative px-6 pt-20 overflow-hidden">
      {/* Parallax dot grid background */}
      <motion.div 
        className="absolute inset-0 dot-grid"
        style={{ y: dotGridY }}
      />
      {/* Parallax gradient mesh background */}
      <motion.div 
        className="absolute inset-0 gradient-mesh" 
        style={{ y: bgY }}
      />
      {/* Floating orbs with teal accent and parallax */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 floating-orb floating-orb-teal"
        style={{ y: orb1Y }}
        animate={{ 
          x: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 floating-orb floating-orb-neutral"
        style={{ y: orb2Y }}
        animate={{ 
          x: [0, -40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/3 w-64 h-64 floating-orb floating-orb-teal"
        style={{ y: orb3Y }}
        animate={{ 
          x: [0, -30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
      />
      <motion.div 
        style={{ opacity, scale, y }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="w-16 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 glow-text">
            <MouseFollowText>Peter Kaliszky</MouseFollowText>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="h-12 sm:h-14 md:h-16 mb-8"
        >
          <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-muted-foreground">
            {displayText}
            <motion.span 
              className="text-foreground/40"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              |
            </motion.span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
        >Product Owner with 8+ years of experience turning complex payment systems into seamless digital products. Passionate about discovery, strategy, and AI-driven product management.</motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            variant="ghost"
            onClick={scrollToProjects}
            className="bg-foreground text-background border border-transparent hover:bg-foreground/90 px-8"
            data-testid="button-view-work"
          >
            My Projects
          </Button>
          <a href="mailto:kaliszky.peter@gmail.com">
            <Button
              variant="outline"
              size="lg"
              className="backdrop-blur-sm px-8"
              data-testid="button-get-in-touch"
            >
              Get in Touch
            </Button>
          </a>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="w-16 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mt-12"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground/60 uppercase tracking-widest">Scroll</span>
          <ArrowDown className="h-4 w-4 text-muted-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
