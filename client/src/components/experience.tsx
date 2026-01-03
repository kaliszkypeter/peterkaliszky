import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Briefcase, GraduationCap, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Experience } from "@shared/schema";

const experiences: Experience[] = [
  {
    id: "1",
    company: "Barion Payment Inc.",
    role: "Product Owner",
    period: "February 2022 - Present",
    location: "barion.com",
    description: [
      "Lead three SCRUM teams (Payment, Wallet, Wallet Mobile), collaborating cross-functionally to ensure alignment with business objectives and customer needs.",
      "Drive product growth by gathering insights from customers, identifying market opportunities, and leveraging product analytics to prioritize impactful features.",
      "Define and manage team OKRs, goals, and priorities; translate business requirements into clear, actionable user stories.",
      "Own the product backlog, contributing to product roadmap planning and company strategy in partnership with C-level management.",
    ],
    achievements: [
      "Increased Payment Conversion Rate: Led initiatives that boosted and maintained the payment gateway's conversion rate at 80%+.",
      "Implemented Strong Customer Authentication: Introduced passkey authentication for e-money wallets, adopted by 40,000+ users.",
    ],
  },
  {
    id: "2",
    company: "Peak Financial Services",
    role: "Product Owner",
    period: "Apr 2018 - January 2022",
    location: "peakfs.io",
    description: [
      "Managed full lifecycle of white-label mobile and web app development, from planning to delivery.",
      "Led SCRUM teams (4-12 members) and facilitated agile ceremonies across projects.",
      "Collaborated with developers and architects to create IT specs and high-level architecture using UML tools.",
    ],
  },
  {
    id: "3",
    company: "Hewlett Packard Enterprise",
    role: "IT Project Manager",
    period: "Jan 2016 - Mar 2018",
    location: "hpe.com",
    description: [
      "Worked alongside the Program Manager on Nokia's global network transformation project.",
      "Conducted risk and issue management, schedule tracking, and dependency analysis.",
      "Managed and tracked program-level networking tasks.",
    ],
  },
  {
    id: "4",
    company: "Microsoft",
    role: "IT Project Manager Intern",
    period: "Oct 2014 - Jul 2015",
    location: "microsoft.com",
    description: [
      "Tracked milestones and results, maintaining continuous communication with customers.",
      "Prepared progress and completion reports for government projects.",
      "Managed the Internship Case Study team.",
    ],
  },
];

const education = [
  {
    degree: "MSc in Human-Centered Informatics",
    school: "Aalborg University",
    location: "Denmark",
    period: "Sep 2013 - Jul 2015",
  },
  {
    degree: "BSc in Business Information Technology",
    school: "Corvinus University of Budapest",
    location: "Hungary",
    period: "Sep 2009 - Jul 2013",
  },
];

export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section id="experience" className="py-24 sm:py-32 px-6 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 gradient-mesh"
        style={{ y: backgroundY }}
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
            Experience & Education
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A journey through product ownership and technology leadership
          </p>
        </motion.div>

        {/* Work Experience */}
        <div className="mb-20">
          <motion.div 
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="p-2 rounded-lg bg-foreground/5 border border-foreground/10">
              <Briefcase className="h-5 w-5 text-foreground/70" />
            </div>
            <h3 className="font-serif text-xl font-semibold">Work Experience</h3>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="relative pl-8 border-l border-foreground/10"
              >
                <motion.div 
                  className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full teal-dot border-2 border-background"
                  whileHover={{ scale: 1.5 }}
                />
                
                <motion.div 
                  className="glass-card p-6 sm:p-8 glow-border group"
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <h4 className="font-semibold text-lg">{exp.role}</h4>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span>{exp.company}</span>
                        <a
                          href={`https://${exp.location}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                          data-testid={`link-company-${exp.id}`}
                        >
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0 bg-foreground/5 border-foreground/10">
                      {exp.period}
                    </Badge>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.description.map((desc, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-start gap-3"
                      >
                        <span className="mt-2 w-1 h-1 rounded-full bg-foreground/30 shrink-0" />
                        {desc}
                      </li>
                    ))}
                  </ul>

                  {exp.achievements && (
                    <motion.div 
                      className="pt-4 border-t border-foreground/10"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    >
                      <p className="text-sm font-medium mb-3">Key Achievements</p>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground flex items-start gap-3"
                          >
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-foreground/50 shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <motion.div 
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="p-2 rounded-lg bg-foreground/5 border border-foreground/10">
              <GraduationCap className="h-5 w-5 text-foreground/70" />
            </div>
            <h3 className="font-serif text-xl font-semibold">Education</h3>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="glass-card p-6 glow-border"
              >
                <h4 className="font-semibold mb-2">{edu.degree}</h4>
                <p className="text-muted-foreground text-sm">{edu.school}</p>
                <p className="text-muted-foreground text-sm">
                  {edu.location} · {edu.period}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
