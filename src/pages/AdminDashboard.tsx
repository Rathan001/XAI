import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatCard } from "@/components/banking/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { mockRecommendations, mockTransactions } from "@/data/mockData";
import { motion } from "framer-motion";
import { 
  Users, 
  Brain, 
  Activity, 
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  BarChart3
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from "recharts";

// Mock admin data
const userActivityData = [
  { day: 'Mon', users: 120, recommendations: 45 },
  { day: 'Tue', users: 150, recommendations: 52 },
  { day: 'Wed', users: 180, recommendations: 68 },
  { day: 'Thu', users: 165, recommendations: 61 },
  { day: 'Fri', users: 200, recommendations: 75 },
  { day: 'Sat', users: 90, recommendations: 32 },
  { day: 'Sun', users: 70, recommendations: 28 },
];

const recommendationAccuracy = [
  { month: 'Jul', accuracy: 82, adopted: 65 },
  { month: 'Aug', accuracy: 85, adopted: 70 },
  { month: 'Sep', accuracy: 88, adopted: 75 },
  { month: 'Oct', accuracy: 87, adopted: 78 },
  { month: 'Nov', accuracy: 91, adopted: 82 },
  { month: 'Dec', accuracy: 89, adopted: 80 },
];

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

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
            <h1 className="font-heading text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              System analytics and AI performance monitoring
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Users"
              value="1,247"
              icon={Users}
              trend="up"
              trendValue="+12% this month"
              delay={0}
            />
            <StatCard
              title="AI Recommendations"
              value="4,892"
              icon={Brain}
              trend="up"
              trendValue="+24% this month"
              delay={0.1}
            />
            <StatCard
              title="Avg. Confidence"
              value="87%"
              icon={TrendingUp}
              subtitle="Across all recommendations"
              delay={0.2}
            />
            <StatCard
              title="System Uptime"
              value="99.9%"
              icon={Activity}
              subtitle="Last 30 days"
              delay={0.3}
            />
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* User Activity Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Weekly User Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={userActivityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="day" 
                          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis 
                          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="users" name="Active Users" fill="hsl(220, 55%, 18%)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="recommendations" name="Recommendations" fill="hsl(40, 75%, 50%)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recommendation Accuracy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg">AI Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={recommendationAccuracy}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="month" 
                          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis 
                          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                          domain={[50, 100]}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                          formatter={(value: number) => [`${value}%`, '']}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="accuracy" 
                          name="AI Accuracy" 
                          stroke="hsl(152, 60%, 40%)" 
                          strokeWidth={2}
                          dot={{ fill: 'hsl(152, 60%, 40%)' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="adopted" 
                          name="User Adoption" 
                          stroke="hsl(40, 75%, 50%)" 
                          strokeWidth={2}
                          dot={{ fill: 'hsl(40, 75%, 50%)' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* System Status */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recommendation Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Recommendation Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { category: 'Spending', count: 1847, icon: BarChart3, color: 'text-warning' },
                    { category: 'Investment', count: 1234, icon: TrendingUp, color: 'text-success' },
                    { category: 'Budget', count: 892, icon: Brain, color: 'text-gold' },
                    { category: 'Alerts', count: 456, icon: AlertTriangle, color: 'text-destructive' },
                  ].map((item) => (
                    <div key={item.category} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <span className="font-medium">{item.category}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.count.toLocaleString()}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent System Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Recent System Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { event: 'AI model retrained with new data', time: '2 hours ago', status: 'success' },
                    { event: 'New user registration spike detected', time: '4 hours ago', status: 'info' },
                    { event: 'Recommendation batch processed (1,247)', time: '6 hours ago', status: 'success' },
                    { event: 'Database backup completed', time: '12 hours ago', status: 'success' },
                    { event: 'High API latency detected', time: '1 day ago', status: 'warning' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        {item.status === 'success' && <CheckCircle2 className="w-5 h-5 text-success" />}
                        {item.status === 'warning' && <AlertTriangle className="w-5 h-5 text-warning" />}
                        {item.status === 'info' && <Activity className="w-5 h-5 text-info" />}
                        <span className="text-sm">{item.event}</span>
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
