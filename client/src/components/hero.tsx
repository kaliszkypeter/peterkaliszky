import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { MapPin, Mail, ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = [
  "Product Owner",
  "Payment Systems",
  "Digital Products",
  "AI Innovation",
];

export function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);
  const y = useTransform(scrollY, [0, 400], [0, 50]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) / 50);
        mouseY.set((e.clientY - centerY) / 50);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

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
    <section 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative px-6 pt-20 overflow-hidden"
    >
      {/* Particle grid background */}
      <div className="absolute inset-0 particle-grid opacity-50" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 gradient-mesh" />
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{ 
          x: springX,
          y: springY,
          background: "radial-gradient(circle, hsl(var(--sage) / 0.08) 0%, transparent 70%)"
        }}
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-foreground/[0.02] blur-3xl"
        animate={{ 
          x: [0, -40, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div 
        style={{ opacity, scale, y }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        {/* Decorative line with sage accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="w-16 h-px mx-auto mb-8"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--sage) / 0.5), transparent)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 glow-text">
            Peter Kaliszky
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
              className="text-sage"
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
        >
          Product Owner with 6+ years of experience turning complex payment systems 
          into seamless digital products. Passionate about discovery, strategy, 
          and AI-driven product management.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 text-sage" />
            <span>Budapest, Hungary</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-sage/50" />
          <a
            href="mailto:kaliszky.peter@gmail.com"
            className="flex items-center gap-2 text-muted-foreground text-sm hover:text-sage transition-colors duration-300"
            data-testid="link-email"
          >
            <Mail className="h-4 w-4" />
            <span>kaliszky.peter@gmail.com</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={scrollToProjects}
            className="group btn-sage px-8"
            data-testid="button-view-work"
          >
            <span className="relative flex items-center gap-2">
              View My Work
              <motion.span
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Sparkles className="h-3 w-3" />
              </motion.span>
            </span>
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
          className="w-16 h-px mx-auto mt-12"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--sage) / 0.5), transparent)" }}
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
          <ArrowDown className="h-4 w-4 text-sage/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
