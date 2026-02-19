import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { useMemo } from "react";
import type { Transaction } from "@/lib/transactions";

interface FraudChartProps {
  transactions: Transaction[];
}

const FraudChart = ({ transactions }: FraudChartProps) => {
  const data = useMemo(() => {
    return transactions
      .slice(0, 20)
      .reverse()
      .map((tx, i) => ({
        time: tx.timestamp.substring(11, 19),
        score: tx.probability,
      }));
  }, [transactions]);

  return (
    <div className="border border-border bg-card p-5 h-full">
      <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase mb-4">
        Fraud Score Trend — Live
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 10%)" vertical={false} />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "hsl(0 0% 45%)" }}
            axisLine={{ stroke: "hsl(0 0% 10%)" }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 1]}
            ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]}
            tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "hsl(0 0% 45%)" }}
            axisLine={{ stroke: "hsl(0 0% 10%)" }}
            tickLine={false}
            tickFormatter={(v) => v.toFixed(4)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(0 0% 4%)",
              border: "1px solid hsl(0 0% 10%)",
              borderRadius: 0,
              fontFamily: "JetBrains Mono",
              fontSize: 11,
            }}
            labelStyle={{ color: "hsl(0 0% 45%)" }}
            itemStyle={{ color: "hsl(160 84% 39%)" }}
            formatter={(value: number) => [value.toFixed(4), "Score"]}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="hsl(160 84% 39%)"
            strokeWidth={1.5}
            fill="hsl(160 84% 39%)"
            fillOpacity={0.05}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FraudChart;
