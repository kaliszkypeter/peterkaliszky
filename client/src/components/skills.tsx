import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { SkillCategory } from "@shared/schema";

const skillCategories: SkillCategory[] = [
  {
    name: "Product Management",
    skills: ["JIRA", "Azure DevOps", "Confluence", "Notion", "Figma", "Miro"],
  },
  {
    name: "Analytics & Insights",
    skills: ["Metabase", "Mixpanel", "Clarity", "Google Analytics", "Firebase"],
  },
  {
    name: "AI & Productivity",
    skills: ["Lovable", "Perplexity", "Claude", "ChatGPT", "Gemini", "NotebookLM", "n8n", "Replit"],
  },
  {
    name: "Languages",
    skills: [
      "English (Professional)",
      "German (Intermediate)",
      "Hungarian (Native)",
      "Italian (Beginner)",
    ],
  },
];

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 sm:py-32 px-6 relative">
      {/* Top decorative line */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1 }}
      />
      <div className="max-w-6xl mx-auto">
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
            Skills & Tools
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Technologies and tools I work with daily</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-card p-6 glow-border group"
            >
              <h3 className="font-semibold mb-4 group-hover:text-foreground transition-colors">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 + skillIndex * 0.03 }}
                  >
                    <Badge
                      variant="secondary"
                      className="text-xs bg-foreground/5 border-foreground/10 hover:bg-foreground/10 transition-colors"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
