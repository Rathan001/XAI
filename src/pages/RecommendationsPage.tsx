import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RecommendationCard } from "@/components/banking/RecommendationCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { mockRecommendations } from "@/data/mockData";
import { motion } from "framer-motion";
import { 
  Lightbulb, 
  Brain, 
  TrendingUp, 
  AlertTriangle,
  Filter,
  RefreshCw
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function RecommendationsPage() {
  const { isAuthenticated } = useAuth();
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const filteredRecs = mockRecommendations.filter((rec) => {
    const matchesCategory = categoryFilter === "all" || rec.category === categoryFilter;
    const matchesPriority = priorityFilter === "all" || rec.priority === priorityFilter;
    return matchesCategory && matchesPriority;
  });

  const highPriorityCount = mockRecommendations.filter(r => r.priority === 'high').length;
  const avgConfidence = Math.round(
    mockRecommendations.reduce((sum, r) => sum + r.confidenceScore, 0) / mockRecommendations.length
  );
  const totalSavings = mockRecommendations
    .filter(r => r.expectedSavings)
    .reduce((sum, r) => sum + (r.expectedSavings || 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-gold/10">
                <Brain className="w-6 h-6 text-gold" />
              </div>
              <h1 className="font-heading text-3xl font-bold text-foreground">AI Insights</h1>
            </div>
            <p className="text-muted-foreground">
              Personalized recommendations with full transparency on why each suggestion was made
            </p>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">High Priority</p>
                      <p className="text-2xl font-bold text-destructive">{highPriorityCount}</p>
                      <p className="text-xs text-muted-foreground">Actions needed</p>
                    </div>
                    <div className="p-3 rounded-full bg-destructive/10">
                      <AlertTriangle className="w-6 h-6 text-destructive" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Confidence</p>
                      <p className="text-2xl font-bold text-foreground">{avgConfidence}%</p>
                      <p className="text-xs text-muted-foreground">AI certainty level</p>
                    </div>
                    <div className="p-3 rounded-full bg-gold/10">
                      <Lightbulb className="w-6 h-6 text-gold" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Potential Savings</p>
                      <p className="text-2xl font-bold text-success">
                        ₹{totalSavings.toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs text-muted-foreground">If all actions taken</p>
                    </div>
                    <div className="p-3 rounded-full bg-success/10">
                      <TrendingUp className="w-6 h-6 text-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* XAI Methodology Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="mb-6 xai-explanation">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      How Our XAI System Works
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Our Explainable AI uses a <strong>hybrid approach</strong> combining rule-based logic 
                      with pattern recognition. Each recommendation shows:
                    </p>
                    <div className="grid sm:grid-cols-4 gap-3">
                      {[
                        { label: "Why", desc: "Reason for recommendation" },
                        { label: "Factors", desc: "Weighted influences" },
                        { label: "Confidence", desc: "AI certainty score" },
                        { label: "Benefit", desc: "Expected outcome" },
                      ].map((item) => (
                        <div key={item.label} className="p-3 bg-card rounded-lg border border-border">
                          <p className="font-medium text-sm text-gold">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex flex-wrap gap-3">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-[160px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="savings">Savings</SelectItem>
                        <SelectItem value="spending">Spending</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                        <SelectItem value="budget">Budget</SelectItem>
                        <SelectItem value="alert">Alerts</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priority</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button variant="outline" className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Refresh Insights
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recommendations List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            {filteredRecs.length > 0 ? (
              filteredRecs.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <RecommendationCard recommendation={rec} />
                </motion.div>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  <Lightbulb className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p>No recommendations match your current filters.</p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
