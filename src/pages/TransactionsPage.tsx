import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TransactionList } from "@/components/banking/TransactionItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { mockTransactions } from "@/data/mockData";
import { TransactionCategory } from "@/types/banking";
import { motion } from "framer-motion";
import { Search, Filter, Download, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories: TransactionCategory[] = [
  'food', 'shopping', 'bills', 'travel', 'entertainment', 
  'groceries', 'healthcare', 'education', 'income', 'investment', 
  'emi', 'rent', 'utilities', 'transfer'
];

export default function TransactionsPage() {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const filteredTransactions = mockTransactions.filter((t) => {
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.merchant?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || t.category === selectedCategory;
    const matchesType = selectedType === "all" || t.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const totalCredit = filteredTransactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalDebit = filteredTransactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

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
            <h1 className="font-heading text-3xl font-bold text-foreground">Transactions</h1>
            <p className="text-muted-foreground mt-1">
              View and manage all your transaction history
            </p>
          </motion.div>

          {/* Summary Cards */}
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
                      <p className="text-sm text-muted-foreground">Total Credit</p>
                      <p className="text-2xl font-bold text-success">
                        +₹{totalCredit.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-success/10">
                      <ArrowDownLeft className="w-6 h-6 text-success" />
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
                      <p className="text-sm text-muted-foreground">Total Debit</p>
                      <p className="text-2xl font-bold text-foreground">
                        -₹{totalDebit.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-muted">
                      <ArrowUpRight className="w-6 h-6 text-muted-foreground" />
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
                      <p className="text-sm text-muted-foreground">Net Flow</p>
                      <p className={`text-2xl font-bold ${totalCredit - totalDebit >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {totalCredit - totalDebit >= 0 ? '+' : ''}₹{(totalCredit - totalDebit).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-gold/10">
                      <Filter className="w-6 h-6 text-gold" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  {/* Category Filter */}
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat} className="capitalize">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {/* Type Filter */}
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full md:w-[140px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="credit">Credit</SelectItem>
                      <SelectItem value="debit">Debit</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {/* Export Button */}
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Transactions List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg flex items-center justify-between">
                  <span>All Transactions</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {filteredTransactions.length} transactions
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredTransactions.length > 0 ? (
                  <TransactionList transactions={filteredTransactions} />
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No transactions found matching your filters.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
