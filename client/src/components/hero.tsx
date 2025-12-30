import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, ArrowDown } from "lucide-react";
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

  const scrollToWork = () => {
    const element = document.getElementById("work");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative px-6 pt-20 gradient-mesh">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4">
            Peter Kaliszky
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-12 sm:h-14 md:h-16 mb-6"
        >
          <span className="font-serif text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {displayText}
            <span className="text-muted-foreground animate-pulse">|</span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed"
        >
          Product Owner with 6+ years of experience turning complex payment systems 
          into seamless digital products. Passionate about discovery, strategy, 
          and AI-driven product management.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Budapest, Hungary</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground" />
          <a
            href="mailto:kaliszky.peter@gmail.com"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-email"
          >
            <Mail className="h-4 w-4" />
            <span>kaliszky.peter@gmail.com</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={scrollToWork}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0"
            data-testid="button-view-work"
          >
            View My Work
          </Button>
          <a href="mailto:kaliszky.peter@gmail.com">
            <Button
              variant="outline"
              size="lg"
              className="backdrop-blur-sm"
              data-testid="button-get-in-touch"
            >
              Get in Touch
            </Button>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
