type Verdict = "SAFE" | "FRAUD" | "REVIEW";

interface Transaction {
  timestamp: string;
  id: string;
  probability: number;
  verdict: Verdict;
}

const transactions: Transaction[] = [
  { timestamp: "2026-02-06 14:32:07", id: "TXN-8f3a...c91d", probability: 0.0012, verdict: "SAFE" },
  { timestamp: "2026-02-06 14:31:54", id: "TXN-2b7e...a4f0", probability: 0.9834, verdict: "FRAUD" },
  { timestamp: "2026-02-06 14:31:41", id: "TXN-c1d9...38b2", probability: 0.4521, verdict: "REVIEW" },
  { timestamp: "2026-02-06 14:31:28", id: "TXN-f7a2...6e1c", probability: 0.0003, verdict: "SAFE" },
  { timestamp: "2026-02-06 14:31:15", id: "TXN-9e4b...d7f3", probability: 0.8912, verdict: "FRAUD" },
  { timestamp: "2026-02-06 14:31:02", id: "TXN-3c8d...b5a9", probability: 0.0087, verdict: "SAFE" },
  { timestamp: "2026-02-06 14:30:49", id: "TXN-6a1f...e2c8", probability: 0.3245, verdict: "REVIEW" },
  { timestamp: "2026-02-06 14:30:36", id: "TXN-d4e7...91a6", probability: 0.0001, verdict: "SAFE" },
  { timestamp: "2026-02-06 14:30:23", id: "TXN-b2c5...f8d4", probability: 0.7623, verdict: "FRAUD" },
  { timestamp: "2026-02-06 14:30:10", id: "TXN-1f9a...c3b7", probability: 0.0045, verdict: "SAFE" },
];

const verdictStyles: Record<Verdict, string> = {
  SAFE: "bg-safe text-safe-foreground",
  FRAUD: "bg-fraud text-fraud-foreground",
  REVIEW: "bg-alert text-alert-foreground",
};

const TransactionFeed = () => {
  return (
    <div className="border border-border bg-card p-5">
      <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase mb-4">
        Transaction Feed — Last 10
      </p>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium tracking-wider text-muted-foreground uppercase py-2 pr-4">
                Timestamp
              </th>
              <th className="text-left text-xs font-medium tracking-wider text-muted-foreground uppercase py-2 pr-4">
                ID
              </th>
              <th className="text-left text-xs font-medium tracking-wider text-muted-foreground uppercase py-2 pr-4">
                Probability
              </th>
              <th className="text-left text-xs font-medium tracking-wider text-muted-foreground uppercase py-2">
                Verdict
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="font-mono text-xs text-muted-foreground py-3 pr-4">
                  {tx.timestamp}
                </td>
                <td className="font-mono text-xs text-foreground py-3 pr-4">
                  {tx.id}
                </td>
                <td className="font-mono text-xs text-foreground py-3 pr-4">
                  {tx.probability.toFixed(4)}
                </td>
                <td className="py-3">
                  <span
                    className={`font-mono text-[10px] font-semibold tracking-wider px-2 py-1 ${verdictStyles[tx.verdict]}`}
                  >
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
