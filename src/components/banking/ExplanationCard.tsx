import { cn } from "@/lib/utils";
import { ConfidenceLevel, ExplanationFactor } from "@/types/banking";
import { TrendingUp, TrendingDown, Minus, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface ConfidenceBadgeProps {
  score: number;
  level: ConfidenceLevel;
  showScore?: boolean;
  className?: string;
}

export function ConfidenceBadge({ score, level, showScore = true, className }: ConfidenceBadgeProps) {
  const levelConfig = {
    high: {
      bg: 'bg-success/10',
      text: 'text-success',
      border: 'border-success/30',
      label: 'High Confidence',
      icon: CheckCircle2,
    },
    medium: {
      bg: 'bg-warning/10',
      text: 'text-warning',
      border: 'border-warning/30',
      label: 'Medium Confidence',
      icon: Info,
    },
    low: {
      bg: 'bg-destructive/10',
      text: 'text-destructive',
      border: 'border-destructive/30',
      label: 'Low Confidence',
      icon: AlertTriangle,
    },
  };

  const config = levelConfig[level];
  const Icon = config.icon;

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium",
        config.bg, config.text, config.border,
        className
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      {showScore ? `${score}%` : config.label}
    </div>
  );
}

interface FactorItemProps {
  factor: ExplanationFactor;
  index: number;
}

export function FactorItem({ factor, index }: FactorItemProps) {
  const impactConfig = {
    positive: {
      icon: TrendingUp,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    negative: {
      icon: TrendingDown,
      color: 'text-destructive',
      bg: 'bg-destructive/10',
    },
    neutral: {
      icon: Minus,
      color: 'text-muted-foreground',
      bg: 'bg-muted',
    },
  };

  const config = impactConfig[factor.impact];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border"
    >
      <div className={cn("p-1.5 rounded-md", config.bg)}>
        <Icon className={cn("w-4 h-4", config.color)} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-sm text-foreground">{factor.factor}</span>
          <span className={cn("text-xs font-medium", config.color)}>
            {Math.round(factor.weight * 100)}% weight
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{factor.description}</p>
        {/* Weight bar */}
        <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${factor.weight * 100}%` }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            className={cn(
              "h-full rounded-full",
              factor.impact === 'positive' ? 'bg-success' :
              factor.impact === 'negative' ? 'bg-destructive' : 'bg-muted-foreground'
            )}
          />
        </div>
      </div>
    </motion.div>
  );
}

interface ExplanationCardProps {
  why: string;
  factors: ExplanationFactor[];
  methodology: string;
  dataPoints: number;
  timeframeAnalyzed: string;
  className?: string;
}

export function ExplanationCard({
  why,
  factors,
  methodology,
  dataPoints,
  timeframeAnalyzed,
  className,
}: ExplanationCardProps) {
  return (
    <div className={cn("xai-explanation p-5 space-y-5", className)}>
      {/* Why Section */}
      <div>
        <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          Why this recommendation?
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{why}</p>
      </div>

      {/* Factors Section */}
      <div>
        <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          Key Factors Analyzed
        </h4>
        <div className="space-y-2">
          {factors.map((factor, index) => (
            <FactorItem key={factor.factor} factor={factor} index={index} />
          ))}
        </div>
      </div>

      {/* Methodology Section */}
      <div className="pt-3 border-t border-border">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          AI Methodology
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{methodology}</p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-muted rounded">
            <span className="font-medium">{dataPoints}</span> data points
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-muted rounded">
            Timeframe: <span className="font-medium">{timeframeAnalyzed}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
