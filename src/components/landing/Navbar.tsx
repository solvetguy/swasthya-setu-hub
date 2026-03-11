import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Heart className="h-7 w-7 text-primary" />
          <span className="text-xl font-heading font-bold text-foreground">SwasthyaSetu</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#impact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Impact</a>
          <a href="#security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Security</a>
          <Link to="/login"><Button variant="outline" size="sm">Login</Button></Link>
          <Link to="/signup"><Button size="sm">Get Started</Button></Link>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-card border-t border-border"
          >
            <div className="flex flex-col gap-3 p-4">
              <a href="#features" onClick={() => setOpen(false)} className="text-sm text-muted-foreground">Features</a>
              <a href="#impact" onClick={() => setOpen(false)} className="text-sm text-muted-foreground">Impact</a>
              <a href="#security" onClick={() => setOpen(false)} className="text-sm text-muted-foreground">Security</a>
              <Link to="/login" onClick={() => setOpen(false)}><Button variant="outline" className="w-full">Login</Button></Link>
              <Link to="/signup" onClick={() => setOpen(false)}><Button className="w-full">Get Started</Button></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
