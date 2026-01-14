import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  icon?: React.ElementType;
  iconColor?: string;
  className?: string;
  delay?: number;
}

export function StatCard({ 
  title, 
  value, 
  subtitle,
  trend,
  trendValue,
  icon: Icon,
  iconColor = 'text-primary',
  className,
  delay = 0,
}: StatCardProps) {
  const trendConfig = {
    up: { icon: TrendingUp, color: 'text-success', bg: 'bg-success/10' },
    down: { icon: TrendingDown, color: 'text-destructive', bg: 'bg-destructive/10' },
    stable: { icon: Minus, color: 'text-muted-foreground', bg: 'bg-muted' },
  };

  const TrendIcon = trend ? trendConfig[trend].icon : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className={cn("p-5 stat-glow transition-all duration-300", className)}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-2xl font-heading font-bold text-foreground mt-1">
              {typeof value === 'number' ? `₹${value.toLocaleString('en-IN')}` : value}
            </p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          
          {Icon && (
            <div className={cn("p-2.5 rounded-lg bg-primary/10", iconColor)}>
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>

        {trend && trendValue && (
          <div className={cn(
            "inline-flex items-center gap-1 mt-3 px-2 py-1 rounded text-xs font-medium",
            trendConfig[trend].bg,
            trendConfig[trend].color
          )}>
            {TrendIcon && <TrendIcon className="w-3 h-3" />}
            {trendValue}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
