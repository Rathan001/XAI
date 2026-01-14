import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("bg-primary text-primary-foreground py-12", className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-heading font-bold text-lg">X</span>
              </div>
              <span className="font-heading font-semibold text-lg">
                XAI<span className="text-gold">Bank</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm max-w-md">
              An Explainable AI-Based Personalized Banking Web Application. 
              Transparent, trustworthy, and tailored to your financial journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/dashboard" className="hover:text-gold transition-colors">Dashboard</Link></li>
              <li><Link to="/transactions" className="hover:text-gold transition-colors">Transactions</Link></li>
              <li><Link to="/recommendations" className="hover:text-gold transition-colors">AI Insights</Link></li>
            </ul>
          </div>

          {/* Research */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Research</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-gold transition-colors">XAI Methodology</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Publications</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">About Project</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © 2024 XAI Bank. Academic Research Project.
          </p>
          <p className="text-xs text-primary-foreground/40">
            Built for emerging markets with explainable AI
          </p>
        </div>
      </div>
    </footer>
  );
}
