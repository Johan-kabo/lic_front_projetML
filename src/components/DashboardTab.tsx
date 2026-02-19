import { useState, useEffect, useCallback } from "react";
import StatsRow from "./StatsRow";
import FraudChart from "./FraudChart";
import RiskDistribution from "./RiskDistribution";
import TransactionFeed from "./TransactionFeed";
import { generateBatch, type Transaction } from "@/lib/transactions";

const DashboardTab = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => generateBatch(10));
  const [isSimulating, setIsSimulating] = useState(false);

  const addTransaction = useCallback(() => {
    const newTx = generateBatch(1)[0];
    setTransactions((prev) => [newTx, ...prev.slice(0, 49)]);
  }, []);

  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(addTransaction, 1500);
    return () => clearInterval(interval);
  }, [isSimulating, addTransaction]);

  const stats = {
    total: transactions.length,
    fraudRate: transactions.filter((t) => t.verdict === "FRAUD").length / Math.max(transactions.length, 1),
    totalBlocked: transactions.filter((t) => t.verdict === "FRAUD").reduce((s, t) => s + t.amount, 0),
    avgProb: transactions.reduce((s, t) => s + t.probability, 0) / Math.max(transactions.length, 1),
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
          Simulation Engine
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setTransactions(generateBatch(20))}
            className="font-mono text-[11px] tracking-wider px-4 py-2 border border-border bg-card text-foreground hover:bg-secondary transition-colors"
          >
            GENERATE_BATCH
          </button>
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`font-mono text-[11px] tracking-wider px-4 py-2 border transition-colors ${
              isSimulating
                ? "border-fraud bg-fraud/10 text-fraud"
                : "border-safe bg-safe/10 text-safe"
            }`}
          >
            {isSimulating ? "STOP_STREAM" : "START_STREAM"}
          </button>
        </div>
      </div>

      <StatsRow
        total={stats.total}
        fraudRate={stats.fraudRate}
        totalBlocked={stats.totalBlocked}
        avgLatency={Math.round(15 + Math.random() * 20)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FraudChart transactions={transactions} />
        </div>
        <div className="lg:col-span-1">
          <RiskDistribution transactions={transactions} />
        </div>
      </div>

      <TransactionFeed transactions={transactions} />
    </div>
  );
};

export default DashboardTab;
