import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-20 sm:py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-4">
            Let's Connect
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Interested in working together or just want to chat about product management?
            I'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a href="mailto:kaliszky.peter@gmail.com">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0"
              data-testid="button-email-contact"
            >
              <Mail className="mr-2 h-4 w-4" />
              Send an Email
            </Button>
          </a>
          <a href="tel:+36306188161">
            <Button variant="outline" size="lg" data-testid="button-phone-contact">
              <Phone className="mr-2 h-4 w-4" />
              +36 30 618 8161
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-6 text-muted-foreground"
        >
          <a
            href="https://linkedin.com/in/peterkaliszky"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            data-testid="link-linkedin"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Budapest, Hungary</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
