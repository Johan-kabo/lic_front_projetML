import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip } from "recharts";

const data = [
  { level: "LOW", count: 152840, color: "hsl(160 84% 39%)" },
  { level: "MED", count: 28450, color: "hsl(38 92% 50%)" },
  { level: "HIGH", count: 3003, color: "hsl(0 84% 60%)" },
];

const RiskDistribution = () => {
  return (
    <div className="border border-border bg-card p-5 h-full">
      <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase mb-4">
        Risk Distribution
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
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
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(0 0% 4%)",
              border: "1px solid hsl(0 0% 10%)",
              borderRadius: 0,
              fontFamily: "JetBrains Mono",
              fontSize: 11,
            }}
            labelStyle={{ color: "hsl(0 0% 65%)" }}
            formatter={(value: number) => [value.toLocaleString(), "Transactions"]}
          />
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
