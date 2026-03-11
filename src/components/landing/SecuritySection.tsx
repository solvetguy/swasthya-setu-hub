import { motion } from "framer-motion";
import { Shield, Lock, Eye, KeyRound } from "lucide-react";

const SecuritySection = () => (
  <section id="security" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="rounded-3xl hero-gradient p-px">
          <div className="rounded-3xl bg-card p-8 sm:p-12">
            <div className="text-center mb-10">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-heading font-bold mb-3 text-card-foreground">Your Data, Your Control</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                We use industry-leading security to protect your most sensitive information.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: Lock, title: "Encrypted Storage", desc: "All records are encrypted at rest and in transit." },
                { icon: Eye, title: "Blockchain Verified", desc: "File hashes stored on blockchain for tamper-proof verification." },
                { icon: KeyRound, title: "You Control Access", desc: "Share records with temporary links that you can revoke anytime." },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-heading font-semibold text-sm mb-1 text-card-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default SecuritySection;
