import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import heroImage from "@/assets/hero-illustration.png";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-surface-teal via-background to-surface-green opacity-60" />
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground mb-6">
            <Shield className="h-3.5 w-3.5" /> Secure & Trusted Health Platform
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold leading-tight mb-4">
            <span className="gradient-text">SwasthyaSetu</span>
          </h1>
          <p className="text-lg font-medium text-muted-foreground mb-2">
            One Citizen • One Health Record • Anytime • Anywhere
          </p>
          <p className="text-base text-muted-foreground max-w-lg mb-8 leading-relaxed">
            Your lifetime digital health record system. Store, manage, and share your complete medical history securely — accessible whenever you need it.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/signup">
              <Button size="lg" className="hero-gradient text-primary-foreground gap-2 shadow-lg hover:shadow-xl transition-shadow">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Login
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center"
        >
          <img
            src={heroImage}
            alt="Digital healthcare illustration showing family with medical records"
            className="w-full max-w-md lg:max-w-lg animate-float rounded-3xl"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
