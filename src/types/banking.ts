// Banking Types for XAI Application

export type TransactionCategory = 
  | 'food' 
  | 'shopping' 
  | 'bills' 
  | 'travel' 
  | 'entertainment' 
  | 'groceries' 
  | 'healthcare' 
  | 'education' 
  | 'income' 
  | 'transfer' 
  | 'investment'
  | 'emi'
  | 'rent'
  | 'utilities';

export type TransactionType = 'credit' | 'debit';

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  merchant?: string;
  upiId?: string;
}

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface ExplanationFactor {
  factor: string;
  impact: 'positive' | 'negative' | 'neutral';
  weight: number; // 0-1
  description: string;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  expectedBenefit: string;
  expectedSavings?: number;
  confidenceScore: number; // 0-100
  confidenceLevel: ConfidenceLevel;
  category: 'savings' | 'spending' | 'investment' | 'budget' | 'alert';
  priority: 'high' | 'medium' | 'low';
  explanation: {
    why: string;
    factors: ExplanationFactor[];
    methodology: string;
    dataPoints: number;
    timeframeAnalyzed: string;
  };
  actionable: boolean;
  createdAt: Date;
}

export interface SpendingInsight {
  category: TransactionCategory;
  thisMonth: number;
  lastMonth: number;
  average: number;
  trend: 'up' | 'down' | 'stable';
  percentageChange: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  monthlyIncome?: number;
  savingsGoal?: number;
  joinedAt: Date;
}

export interface DashboardStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  topCategory: TransactionCategory;
  transactionCount: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
  percentage: number;
}
