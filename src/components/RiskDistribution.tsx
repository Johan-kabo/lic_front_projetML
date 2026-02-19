import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { useData } from "@/hooks/useData";

// Custom tooltip to ensure high-contrast value display
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || payload.length === 0) return null;

  const entry = payload[0];
  const count = entry?.value ?? "-";

  return (
    <div className="bg-[#0b0b0c] border border-border p-3 text-sm" style={{ minWidth: 160 }}>
      <div className="text-xs text-muted-foreground mb-2">{label}</div>
      <div className="text-[13px] font-semibold text-white">Transactions : {count}</div>
    </div>
  );
};

const RiskDistribution = () => {
  const { data } = useData();
  const riskData = data.riskDistribution;

  return (
    <div className="border border-border bg-card p-5 h-full">
      <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase mb-4">
        Risk Distribution
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={riskData} layout="vertical" margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(0 0% 10%)"
            horizontal={false}
          />
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
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" barSize={20}>
            {riskData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskDistribution;
