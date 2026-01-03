import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 relative overflow-hidden">
      {/* Top decorative line */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1 }}
      />
      
      {/* Background elements - floating orbs */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] floating-orb floating-orb-sage"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div 
        className="absolute top-1/4 right-1/4 w-[300px] h-[300px] floating-orb floating-orb-neutral"
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 3 }}
      />
      
      <div className="max-w-3xl mx-auto text-center relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mb-6"
          />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 glow-text gradient-text">
            Let's Connect
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
            Interested in working together or just want to chat about product management?
            I'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a href="mailto:kaliszky.peter@gmail.com">
            <Button 
              size="lg" 
              className="group btn-sage px-8"
              data-testid="button-email-contact"
            >
              <Mail className="mr-2 h-4 w-4" />
              Send an Email
              <ArrowUpRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </a>
          <a href="tel:+36306188161">
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8"
              data-testid="button-phone-contact"
            >
              <Phone className="mr-2 h-4 w-4" />
              +36 30 618 8161
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-center gap-8 text-muted-foreground"
        >
          <motion.a
            href="https://linkedin.com/in/peterkaliszky"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
            data-testid="link-linkedin"
            whileHover={{ y: -2 }}
          >
            <Linkedin className="h-5 w-5" />
            <span className="text-sm">LinkedIn</span>
          </motion.a>
          <div className="w-px h-4 bg-foreground/10" />
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Budapest, Hungary</span>
          </div>
        </motion.div>
        
        {/* Bottom decorative element */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent mx-auto mt-16"
        />
      </div>
    </section>
  );
}
