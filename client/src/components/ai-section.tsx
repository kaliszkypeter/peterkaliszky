import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Brain, Cpu, Zap, TrendingUp, Bot, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const aiHighlights = [
  {
    icon: Brain,
    title: "AI-Driven Product Strategy",
    description: "Leveraging machine learning insights to inform product decisions and roadmap prioritization.",
  },
  {
    icon: Cpu,
    title: "LLM Integration",
    description: "Building intelligent features powered by large language models for enhanced user experiences.",
  },
  {
    icon: Bot,
    title: "Automation & Efficiency",
    description: "Implementing AI-powered workflows that reduce manual processes and increase team productivity.",
  },
];

const aiMetrics = [
  { value: "40%", label: "Faster Decision Making" },
  { value: "3x", label: "Product Velocity" },
  { value: "AI-First", label: "Approach" },
];

export function AISection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      id="ai" 
      className="py-32 px-6 relative overflow-hidden"
      ref={ref}
    >
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 gradient-mesh" 
        style={{ y: backgroundY }}
      />
      
      {/* Floating orbs with teal accent */}
      <motion.div 
        className="absolute top-20 right-20 w-64 h-64 floating-orb floating-orb-teal"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-40 left-20 w-48 h-48 floating-orb floating-orb-teal"
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />
      
      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
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
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            <Badge 
              variant="secondary" 
              className="badge-teal"
            >
              AI Leadership
            </Badge>
          </motion.div>
          
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 glow-text gradient-text">
            AI Corner
          </h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mb-6"
          />
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pioneering the integration of artificial intelligence into product management, 
            from strategic planning to execution.
          </p>
        </motion.div>

        {/* Main AI Card with Glow */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <div className="ai-glow-teal glass-card p-8 md:p-12 rounded-3xl glow-border animated-border">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <motion.div 
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="p-3 rounded-xl bg-foreground/5 border border-foreground/10">
                    <Zap className="h-6 w-6 text-foreground/70" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">
                    The Future of Product Management
                  </h3>
                </motion.div>
                
                <motion.p 
                  className="text-muted-foreground mb-6 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  I believe AI is not just a tool, but a fundamental shift in how we build products. 
                  From using ML models for user behavior prediction to implementing LLM-powered features, 
                  I'm at the forefront of this transformation.
                </motion.p>
                
                <motion.p 
                  className="text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  Currently exploring: AI-driven discovery processes, automated user research synthesis, 
                  and intelligent product analytics.
                </motion.p>
              </div>
              
              {/* AI Metrics */}
              <div className="grid gap-4">
                {aiMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="glass-panel rounded-xl p-5 flex items-center gap-4 group cursor-default"
                  >
                    <div className="text-3xl font-bold font-serif">
                      {metric.value}
                    </div>
                    <div className="text-muted-foreground">
                      {metric.label}
                    </div>
                    <ArrowUpRight className="h-4 w-4 ml-auto text-muted-foreground/0 group-hover:text-muted-foreground/50 transition-all" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Highlights Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {aiHighlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-card p-6 rounded-2xl group glow-border"
            >
              <motion.div 
                className="p-3 rounded-xl bg-foreground/5 border border-foreground/10 w-fit mb-4 group-hover:bg-foreground/10 transition-colors duration-300"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <item.icon className="h-6 w-6 text-foreground/70" />
              </motion.div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center mt-16"
        >
          <a href="mailto:kaliszky.peter@gmail.com">
            <Button 
              size="lg"
              className="group bg-foreground text-background hover:bg-foreground/90 px-8"
              data-testid="button-discuss-ai"
            >
              <TrendingUp className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
              Let's Discuss AI Strategy
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
