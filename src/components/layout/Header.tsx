import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Receipt, 
  Lightbulb, 
  Settings, 
  LogOut,
  Menu,
  X,
  Shield,
  User
} from "lucide-react";
import { NavItem } from "./NavItem";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={cn("sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border", className)}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg hero-gradient flex items-center justify-center">
              <span className="text-gold font-heading font-bold text-lg">X</span>
            </div>
            <span className="font-heading font-semibold text-lg text-foreground">
              XAI<span className="text-gold">Bank</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-1">
              <NavItem to="/dashboard" icon={LayoutDashboard}>Dashboard</NavItem>
              <NavItem to="/transactions" icon={Receipt}>Transactions</NavItem>
              <NavItem to="/recommendations" icon={Lightbulb}>AI Insights</NavItem>
              {user?.role === 'admin' && (
                <NavItem to="/admin" icon={Shield}>Admin</NavItem>
              )}
            </nav>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* User Info */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{user?.name}</span>
                  <span className="text-xs px-1.5 py-0.5 bg-gold/20 text-gold rounded capitalize">
                    {user?.role}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden md:flex gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="gold" size="sm" asChild>
                  <Link to="/login">Get Started</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            {isAuthenticated ? (
              <div className="space-y-1">
                <NavItem to="/dashboard" icon={LayoutDashboard}>Dashboard</NavItem>
                <NavItem to="/transactions" icon={Receipt}>Transactions</NavItem>
                <NavItem to="/recommendations" icon={Lightbulb}>AI Insights</NavItem>
                {user?.role === 'admin' && (
                  <NavItem to="/admin" icon={Shield}>Admin</NavItem>
                )}
                <div className="pt-2 mt-2 border-t border-border">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Link to="/login" className="block px-4 py-2 text-sm font-medium text-foreground">
                  Login
                </Link>
                <Link to="/login" className="block px-4 py-2 text-sm font-medium text-gold">
                  Get Started
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
