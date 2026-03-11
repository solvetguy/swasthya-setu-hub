import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="bg-card border-t border-border py-12">
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Heart className="h-5 w-5 text-primary" />
            <span className="font-heading font-bold text-foreground">SwasthyaSetu</span>
          </div>
          <p className="text-sm text-muted-foreground">Your lifetime digital health record system.</p>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm mb-3 text-foreground">Platform</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
            <li><a href="#security" className="hover:text-foreground transition-colors">Security</a></li>
            <li><a href="#impact" className="hover:text-foreground transition-colors">Impact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm mb-3 text-foreground">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm mb-3 text-foreground">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>support@swasthyasetu.com</li>
            <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © 2026 SwasthyaSetu. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
