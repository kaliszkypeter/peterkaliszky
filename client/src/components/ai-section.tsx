import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Brain, Cpu, Zap, TrendingUp, Bot } from "lucide-react";
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

  return (
    <section 
      id="ai" 
      className="py-24 px-6 relative overflow-visible"
      ref={ref}
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      
      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <Badge 
              variant="secondary" 
              className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20"
            >
              AI Leadership
            </Badge>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            Product Innovation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pioneering the integration of artificial intelligence into product management, 
            from strategic planning to execution.
          </p>
        </motion.div>

        {/* Main AI Card with Glow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="ai-glow glass-card p-8 md:p-12 rounded-3xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">
                    The Future of Product Management
                  </h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  I believe AI is not just a tool, but a fundamental shift in how we build products. 
                  From using ML models for user behavior prediction to implementing LLM-powered features, 
                  I'm at the forefront of this transformation.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Currently exploring: AI-driven discovery processes, automated user research synthesis, 
                  and intelligent product analytics. More content coming soon.
                </p>
              </div>
              
              {/* AI Metrics */}
              <div className="grid gap-4">
                {aiMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="glass-panel rounded-xl p-4 flex items-center gap-4"
                  >
                    <div className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                      {metric.value}
                    </div>
                    <div className="text-muted-foreground">
                      {metric.label}
                    </div>
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
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="glass-card p-6 rounded-2xl group"
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 w-fit mb-4 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-colors">
                <item.icon className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-center mt-12"
        >
          <a href="mailto:kaliszky.peter@gmail.com">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0"
              data-testid="button-discuss-ai"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Let's Discuss AI Strategy
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
