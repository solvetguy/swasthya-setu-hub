import { motion } from "framer-motion";
import {
  User, FileText, Upload, QrCode, Shield, Share2,
  Bell, Users, Brain, WifiOff,
} from "lucide-react";

const features = [
  { icon: User, title: "Personal Health Profile", desc: "Store your complete health identity including blood group, allergies, and emergency contacts." },
  { icon: FileText, title: "Lifetime Medical Records", desc: "Keep all your medical records in one secure place, accessible anytime." },
  { icon: Upload, title: "Report Upload & Management", desc: "Upload prescriptions, lab reports, and scans with easy categorization." },
  { icon: QrCode, title: "Emergency QR Code", desc: "Generate a QR code with critical health info for emergency access." },
  { icon: Shield, title: "Blockchain Verification", desc: "Tamper-proof records with blockchain-based file hash verification." },
  { icon: Share2, title: "Controlled Data Sharing", desc: "Share records with doctors via temporary links with expiry control." },
  { icon: Bell, title: "Medicine Reminders", desc: "Never miss a dose with smart medicine reminder notifications." },
  { icon: Users, title: "Family Health Profiles", desc: "Manage health records for your entire family under one account." },
  { icon: Brain, title: "AI Health Summary", desc: "Get AI-powered health insights and summaries (coming soon)." },
  { icon: WifiOff, title: "Offline Emergency Info", desc: "Access critical health information even without internet." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const FeaturesSection = () => (
  <section id="features" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
          Everything You Need for <span className="gradient-text">Digital Health</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A comprehensive platform designed to put you in control of your health data.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={item}
            className="group rounded-xl border border-border bg-card p-6 hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:hero-gradient group-hover:text-primary-foreground transition-colors">
              <f.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
            </div>
            <h3 className="font-heading font-semibold text-sm mb-2 text-card-foreground">{f.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default FeaturesSection;
