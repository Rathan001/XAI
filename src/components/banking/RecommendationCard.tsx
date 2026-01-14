import { cn } from "@/lib/utils";
import { AIRecommendation } from "@/types/banking";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConfidenceBadge, ExplanationCard } from "./ExplanationCard";
import { 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  TrendingUp, 
  PiggyBank, 
  AlertCircle,
  Wallet
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RecommendationCardProps {
  recommendation: AIRecommendation;
  className?: string;
}

const categoryConfig = {
  savings: { icon: PiggyBank, color: 'text-success', bg: 'bg-success/10' },
  spending: { icon: Wallet, color: 'text-warning', bg: 'bg-warning/10' },
  investment: { icon: TrendingUp, color: 'text-info', bg: 'bg-info/10' },
  budget: { icon: Lightbulb, color: 'text-gold', bg: 'bg-gold/10' },
  alert: { icon: AlertCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
};

const priorityConfig = {
  high: 'border-l-destructive',
  medium: 'border-l-warning',
  low: 'border-l-muted-foreground',
};

export function RecommendationCard({ recommendation, className }: RecommendationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const catConfig = categoryConfig[recommendation.category];
  const Icon = catConfig.icon;

  return (
    <Card 
      className={cn(
        "card-hover border-l-4 overflow-hidden",
        priorityConfig[recommendation.priority],
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={cn("p-2 rounded-lg", catConfig.bg)}>
              <Icon className={cn("w-5 h-5", catConfig.color)} />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground">{recommendation.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{recommendation.description}</p>
            </div>
          </div>
          <ConfidenceBadge 
            score={recommendation.confidenceScore} 
            level={recommendation.confidenceLevel}
          />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Expected Benefit */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg mb-4">
          <span className="text-sm text-muted-foreground">Expected Benefit</span>
          <span className="text-sm font-semibold text-success">{recommendation.expectedBenefit}</span>
        </div>

        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-center gap-2 text-muted-foreground hover:text-foreground"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Hide Explanation
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Why this recommendation?
            </>
          )}
        </Button>

        {/* Expandable Explanation */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                <ExplanationCard
                  why={recommendation.explanation.why}
                  factors={recommendation.explanation.factors}
                  methodology={recommendation.explanation.methodology}
                  dataPoints={recommendation.explanation.dataPoints}
                  timeframeAnalyzed={recommendation.explanation.timeframeAnalyzed}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
