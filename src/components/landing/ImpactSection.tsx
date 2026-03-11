import { motion } from "framer-motion";
import { TrendingDown, Zap, Lock, Stethoscope } from "lucide-react";

const stats = [
  { icon: TrendingDown, value: "40%", label: "Reduction in repeated medical tests", color: "bg-surface-teal" },
  { icon: Zap, value: "3x", label: "Faster emergency response time", color: "bg-surface-green" },
  { icon: Lock, value: "100%", label: "Secure lifetime health data storage", color: "bg-surface-blue" },
  { icon: Stethoscope, value: "60%", label: "Better treatment decisions with full history", color: "bg-surface-teal" },
];

const ImpactSection = () => (
  <section id="impact" className="py-24 bg-muted/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
          Real-World <span className="gradient-text">Impact</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Digital health records transform how healthcare is delivered and received.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-card border border-border p-8 text-center shadow-[var(--card-shadow)]"
          >
            <div className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center mx-auto mb-5`}>
              <s.icon className="h-6 w-6 text-primary" />
            </div>
            <p className="text-4xl font-heading font-extrabold gradient-text mb-2">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactSection;
