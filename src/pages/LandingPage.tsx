import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Shield, 
  Brain, 
  TrendingUp, 
  Eye, 
  ChevronRight,
  CheckCircle2,
  Lightbulb,
  BarChart3,
  Lock,
  Users
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Explainable AI",
    description: "Every recommendation comes with a clear explanation of why it was made and what factors influenced it.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    description: "See the methodology, data points analyzed, and confidence scores behind every AI decision.",
  },
  {
    icon: TrendingUp,
    title: "Personalized Insights",
    description: "Tailored to Indian financial context - salary cycles, UPI transactions, and local spending patterns.",
  },
  {
    icon: Shield,
    title: "Build Trust",
    description: "No black-box algorithms. Understand exactly how the AI works to improve your finances.",
  },
];

const benefits = [
  "Reduce unnecessary spending with actionable insights",
  "Optimize EMI timing with your salary cycle",
  "Get alerts before bills are due",
  "Track spending patterns across categories",
  "Increase investments with surplus detection",
  "Understand every AI recommendation",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/20 text-gold rounded-full text-sm font-medium mb-6">
                <Lightbulb className="w-4 h-4" />
                Research Project - Explainable AI in Banking
              </span>
              
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Banking Recommendations
                <span className="block gradient-text">You Can Actually Trust</span>
              </h1>
              
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                An AI-powered banking application that doesn't just tell you what to do — 
                it explains <span className="text-gold font-medium">why</span>, showing the factors, 
                methodology, and confidence behind every recommendation.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/login">
                    Get Started Free
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/login?demo=true">
                    View Demo Dashboard
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Explainable AI Matters
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Traditional AI systems are black boxes. Our XAI approach ensures you understand 
              and trust every financial recommendation.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full card-hover gold-accent">
                  <div className="p-3 rounded-lg bg-gold/10 w-fit mb-4">
                    <feature.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                See Exactly Why Each
                <span className="block text-gold">Recommendation is Made</span>
              </h2>
              
              <p className="text-muted-foreground mb-8">
                Every AI recommendation includes a detailed breakdown showing:
              </p>
              
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
              
              <Button variant="banking" size="lg" className="mt-8" asChild>
                <Link to="/login">
                  Start Your Journey
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <Lightbulb className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Reduce Food Delivery Spending</h4>
                    <span className="text-xs px-2 py-0.5 bg-success/10 text-success rounded-full">87% Confidence</span>
                  </div>
                </div>
                
                <div className="xai-explanation p-4 mb-4">
                  <h5 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    Why this recommendation?
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    Your food delivery expenses are 35% higher than your 3-month average, 
                    with 78% of orders on weekdays between 7-9 PM.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Data Points Analyzed</span>
                    <span className="font-medium">45</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Timeframe</span>
                    <span className="font-medium">Last 90 days</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Expected Savings</span>
                    <span className="font-medium text-success">₹2,750/month</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research Focus Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Addressing Key Research Gaps
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This project tackles critical gaps in existing AI-based banking systems
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: "Transparency Gap", desc: "Most banking AI uses black-box models without explaining decisions" },
              { icon: Users, title: "Trust Deficit", desc: "Users don't trust AI recommendations they can't understand" },
              { icon: BarChart3, title: "Generic Solutions", desc: "Lack of market-specific personalization for Indian users" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center card-hover">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience Transparent AI Banking?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join the demo to see how explainable AI can transform your financial decisions.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/login">
                Launch Demo
                <ChevronRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
