import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { useMemo } from "react";
import type { Transaction } from "@/lib/transactions";

interface RiskDistributionProps {
  transactions: Transaction[];
}

const RiskDistribution = ({ transactions }: RiskDistributionProps) => {
  const data = useMemo(() => {
    const safe = transactions.filter((t) => t.verdict === "SAFE").length;
    const review = transactions.filter((t) => t.verdict === "REVIEW").length;
    const fraud = transactions.filter((t) => t.verdict === "FRAUD").length;
    return [
      { level: "LOW", count: safe, color: "hsl(160 84% 39%)" },
      { level: "MED", count: review, color: "hsl(38 92% 50%)" },
      { level: "HIGH", count: fraud, color: "hsl(0 84% 60%)" },
    ];
  }, [transactions]);
  return (
    <div className="border border-border bg-card p-5 h-full">
      <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase mb-4">
        Risk Distribution
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 10%)" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "hsl(0 0% 45%)" }}
            axisLine={{ stroke: "hsl(0 0% 10%)" }}
            tickLine={false}
          />
          <YAxis
            dataKey="level"
            type="category"
            tick={{ fontSize: 11, fontFamily: "JetBrains Mono", fill: "hsl(0 0% 65%)" }}
            axisLine={{ stroke: "hsl(0 0% 10%)" }}
            tickLine={false}
            width={45}
          />
          <Tooltip />
          <Bar dataKey="count" barSize={20}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskDistribution;
