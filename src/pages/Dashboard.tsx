import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatCard } from "@/components/banking/StatCard";
import { TransactionList } from "@/components/banking/TransactionItem";
import { RecommendationCard } from "@/components/banking/RecommendationCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Link } from "react-router-dom";
import { 
  mockTransactions, 
  mockRecommendations, 
  mockDashboardStats,
  mockCategoryData,
  monthlySpendingTrend 
} from "@/data/mockData";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank,
  ChevronRight,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const stats = mockDashboardStats;
  const topRecommendations = mockRecommendations.slice(0, 2);
  const recentTransactions = mockTransactions.slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Welcome back, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's your financial overview for December 2024
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Balance"
              value={stats.totalBalance}
              icon={Wallet}
              trend="up"
              trendValue="+12% from last month"
              delay={0}
            />
            <StatCard
              title="Monthly Income"
              value={stats.monthlyIncome}
              icon={TrendingUp}
              subtitle="Salary + Other"
              delay={0.1}
            />
            <StatCard
              title="Monthly Expenses"
              value={stats.monthlyExpenses}
              icon={TrendingDown}
              trend="down"
              trendValue="-5% from last month"
              delay={0.2}
            />
            <StatCard
              title="Savings Rate"
              value={`${stats.savingsRate}%`}
              icon={PiggyBank}
              trend="up"
              trendValue="Above target"
              delay={0.3}
            />
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Spending Trend Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="font-heading text-lg">Income vs Expenses Trend</CardTitle>
                  <span className="text-xs text-muted-foreground">Last 6 months</span>
                </CardHeader>
                <CardContent>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlySpendingTrend}>
                        <defs>
                          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(152, 60%, 40%)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(152, 60%, 40%)" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="month" 
                          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                          axisLine={{ stroke: 'hsl(var(--border))' }}
                        />
                        <YAxis 
                          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                          axisLine={{ stroke: 'hsl(var(--border))' }}
                          tickFormatter={(value) => `₹${(value/1000)}k`}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                          formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, '']}
                        />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="income" 
                          stroke="hsl(152, 60%, 40%)" 
                          fillOpacity={1} 
                          fill="url(#colorIncome)" 
                          name="Income"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="expenses" 
                          stroke="hsl(0, 72%, 51%)" 
                          fillOpacity={1} 
                          fill="url(#colorExpenses)" 
                          name="Expenses"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Category Pie Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="font-heading text-lg">Spending by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockCategoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {mockCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, '']}
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {mockCategoryData.slice(0, 4).map((item) => (
                      <div key={item.name} className="flex items-center gap-2 text-xs">
                        <div 
                          className="w-2.5 h-2.5 rounded-full" 
                          style={{ backgroundColor: item.color }} 
                        />
                        <span className="text-muted-foreground">{item.name}</span>
                        <span className="font-medium ml-auto">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* AI Recommendations & Transactions */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* AI Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gold/10">
                      <Lightbulb className="w-5 h-5 text-gold" />
                    </div>
                    <CardTitle className="font-heading text-lg">AI Recommendations</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/recommendations">
                      View All <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topRecommendations.map((rec) => (
                    <RecommendationCard key={rec.id} recommendation={rec} />
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="font-heading text-lg">Recent Transactions</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/transactions">
                      View All <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <TransactionList transactions={recentTransactions} />
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
