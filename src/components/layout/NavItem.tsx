import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  icon?: React.ElementType;
  className?: string;
}

export function NavItem({ to, children, icon: Icon, className }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
        isActive 
          ? "bg-gold/10 text-gold" 
          : "text-muted-foreground hover:text-foreground hover:bg-muted",
        className
      )}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </Link>
  );
}
