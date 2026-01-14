import { cn } from "@/lib/utils";
import { Transaction, TransactionCategory } from "@/types/banking";
import { 
  Utensils, 
  ShoppingBag, 
  Receipt, 
  Car, 
  Film, 
  ShoppingCart,
  Stethoscope,
  GraduationCap,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
  TrendingUp,
  Home,
  Lightbulb
} from "lucide-react";
import { format } from "date-fns";

const categoryIcons: Record<TransactionCategory, React.ElementType> = {
  food: Utensils,
  shopping: ShoppingBag,
  bills: Receipt,
  travel: Car,
  entertainment: Film,
  groceries: ShoppingCart,
  healthcare: Stethoscope,
  education: GraduationCap,
  income: ArrowDownLeft,
  transfer: ArrowLeftRight,
  investment: TrendingUp,
  emi: Receipt,
  rent: Home,
  utilities: Lightbulb,
};

const categoryColors: Record<TransactionCategory, string> = {
  food: 'bg-orange-100 text-orange-600',
  shopping: 'bg-purple-100 text-purple-600',
  bills: 'bg-blue-100 text-blue-600',
  travel: 'bg-teal-100 text-teal-600',
  entertainment: 'bg-red-100 text-red-600',
  groceries: 'bg-green-100 text-green-600',
  healthcare: 'bg-cyan-100 text-cyan-600',
  education: 'bg-indigo-100 text-indigo-600',
  income: 'bg-emerald-100 text-emerald-600',
  transfer: 'bg-gray-100 text-gray-600',
  investment: 'bg-amber-100 text-amber-600',
  emi: 'bg-violet-100 text-violet-600',
  rent: 'bg-rose-100 text-rose-600',
  utilities: 'bg-slate-100 text-slate-600',
};

interface TransactionItemProps {
  transaction: Transaction;
  className?: string;
}

export function TransactionItem({ transaction, className }: TransactionItemProps) {
  const Icon = categoryIcons[transaction.category];
  const colorClass = categoryColors[transaction.category];
  const isCredit = transaction.type === 'credit';

  return (
    <div 
      className={cn(
        "flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:shadow-sm transition-shadow",
        className
      )}
    >
      {/* Category Icon */}
      <div className={cn("p-2.5 rounded-lg", colorClass)}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Transaction Details */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{transaction.description}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-muted-foreground capitalize">{transaction.category}</span>
          {transaction.merchant && (
            <>
              <span className="text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">{transaction.merchant}</span>
            </>
          )}
        </div>
      </div>

      {/* Amount & Date */}
      <div className="text-right">
        <p className={cn(
          "font-semibold",
          isCredit ? "text-success" : "text-foreground"
        )}>
          {isCredit ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {format(transaction.date, 'dd MMM')}
        </p>
      </div>

      {/* Credit/Debit Indicator */}
      <div className={cn(
        "p-1.5 rounded-full",
        isCredit ? "bg-success/10" : "bg-muted"
      )}>
        {isCredit ? (
          <ArrowDownLeft className="w-4 h-4 text-success" />
        ) : (
          <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
    </div>
  );
}

interface TransactionListProps {
  transactions: Transaction[];
  className?: string;
  limit?: number;
}

export function TransactionList({ transactions, className, limit }: TransactionListProps) {
  const displayTransactions = limit ? transactions.slice(0, limit) : transactions;

  return (
    <div className={cn("space-y-2", className)}>
      {displayTransactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}
