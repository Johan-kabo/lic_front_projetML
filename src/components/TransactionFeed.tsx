import type { Transaction, Verdict } from "@/lib/transactions";

interface TransactionFeedProps {
  transactions: Transaction[];
}
const verdictStyles: Record<Verdict, string> = {
  SAFE: "bg-safe text-safe-foreground",
  FRAUD: "bg-fraud text-fraud-foreground",
  REVIEW: "bg-alert text-alert-foreground",
};

const TransactionFeed = ({ transactions }: TransactionFeedProps) => {
  return (
    <div className="border border-border bg-card p-5">
      <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase mb-4">
        Transaction Feed — Last {transactions.length}
      </p>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium tracking-wider text-muted-foreground uppercase py-2 pr-4">Timestamp</th>
              <th className="text-left text-xs font-medium tracking-wider text-muted-foreground uppercase py-2 pr-4">ID</th>
              <th className="text-left text-xs font-medium tracking-wider text-muted-foreground uppercase py-2 pr-4">Client</th>
              <th className="text-left text-xs font-medium tracking-wider text-muted-foreground uppercase py-2 pr-4">Amount</th>
              <th className="text-left text-xs font-medium tracking-wider text-muted-foreground uppercase py-2 pr-4">Country</th>
              <th className="text-left text-xs font-medium tracking-wider text-muted-foreground uppercase py-2 pr-4">Prob</th>
              <th className="text-left text-xs font-medium tracking-wider text-muted-foreground uppercase py-2">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 15).map((tx, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="font-mono text-xs text-muted-foreground py-3 pr-4">{tx.timestamp}</td>
                <td className="font-mono text-xs text-foreground py-3 pr-4">{tx.id}</td>
                <td className="text-xs text-foreground py-3 pr-4">{tx.clientName}</td>
                <td className="font-mono text-xs text-foreground py-3 pr-4">{tx.currency} {tx.amount.toLocaleString()}</td>
                <td className="font-mono text-xs text-foreground py-3 pr-4">{tx.country}</td>
                <td className="font-mono text-xs text-foreground py-3 pr-4">{tx.probability.toFixed(4)}</td>
                <td className="py-3">
                  <span className={`font-mono text-[10px] font-semibold tracking-wider px-2 py-1 ${verdictStyles[tx.verdict]}`}>
                    {tx.verdict}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionFeed;
