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
    name: "Technical Stack",
    skills: [
      "React Native",
      "iOS & Android (Kotlin)",
      "Angular",
      "React",
      ".NET",
      "Node.js",
      "Next.js",
      "TypeScript",
    ],
  },
  {
    name: "Architecture",
    skills: ["Monolith", "Microservices", "API Design", "Postman"],
  },
  {
    name: "AI & Productivity",
    skills: ["Lovable", "Perplexity", "Claude", "ChatGPT"],
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

const learningResources = [
  "The Product Compass (Paweł Huryn)",
  "Lenny's Newsletter and Podcast",
  "Product Growth (Aakash Gupta)",
  "Product Space Newsletter",
  "JustAnotherPM",
];

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-4">
            Skills & Tools
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies and methodologies I work with daily
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <h3 className="font-semibold mb-4">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card p-6"
        >
          <h3 className="font-semibold mb-4">
            Professional Development & Learning
          </h3>
          <div className="flex flex-wrap gap-2">
            {learningResources.map((resource) => (
              <Badge key={resource} variant="outline" className="text-xs">
                {resource}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
