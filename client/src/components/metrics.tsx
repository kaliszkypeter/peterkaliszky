import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Metric {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const metrics: Metric[] = [
  {
    value: 80,
    suffix: "%+",
    label: "Conversion Rate",
    description: "Payment gateway conversion maintained",
  },
  {
    value: 40,
    suffix: "K+",
    label: "Passkey Users",
    description: "Adopted secure authentication",
  },
  {
    value: 6,
    suffix: "+",
    label: "Years Experience",
    description: "In product ownership",
  },
  {
    value: 3,
    suffix: "",
    label: "SCRUM Teams",
    description: "Currently leading",
  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(stepValue * step), value);
      setDisplayValue(current);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-serif text-4xl sm:text-5xl font-bold">
      {displayValue}
      {suffix}
    </span>
  );
}

export function Metrics() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="py-20 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-4">
            Impact & Results
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Delivering measurable outcomes through strategic product leadership
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl glass-card"
            >
              <AnimatedNumber value={metric.value} suffix={metric.suffix} />
              <h3 className="font-medium mt-2 mb-1">{metric.label}</h3>
              <p className="text-sm text-muted-foreground">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
