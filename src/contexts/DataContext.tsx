import React, { createContext, useState, ReactNode } from "react";

export interface FraudChartData {
  time: string;
  score: number;
}

export interface RiskData {
  level: "LOW" | "MED" | "HIGH";
  count: number;
  color: string;
}

export interface Transaction {
  timestamp: string;
  id: string;
  probability: number;
  verdict: "SAFE" | "FRAUD" | "REVIEW";
}

export interface StatsData {
  totalVolume: string;
  detectionRate: string;
  securedAmount: string;
  apiResponseTime: string;
}

export interface AppData {
  stats: StatsData;
  fraudChart: FraudChartData[];
  riskDistribution: RiskData[];
  transactions: Transaction[];
}

const DEFAULT_DATA: AppData = {
  stats: {
    totalVolume: "184,293",
    detectionRate: "99.72%",
    securedAmount: "€12.4M",
    apiResponseTime: "23ms",
  },
  fraudChart: [
    { time: "00:00", score: 0.0012 },
    { time: "02:00", score: 0.0034 },
    { time: "04:00", score: 0.0021 },
    { time: "06:00", score: 0.0089 },
    { time: "08:00", score: 0.0245 },
    { time: "10:00", score: 0.0567 },
    { time: "12:00", score: 0.0423 },
    { time: "14:00", score: 0.0312 },
    { time: "16:00", score: 0.0891 },
    { time: "18:00", score: 0.0234 },
    { time: "20:00", score: 0.0156 },
    { time: "22:00", score: 0.0078 },
  ],
  riskDistribution: [
    { level: "LOW", count: 152840, color: "hsl(160 84% 39%)" },
    { level: "MED", count: 28450, color: "hsl(38 92% 50%)" },
    { level: "HIGH", count: 3003, color: "hsl(0 84% 60%)" },
  ],
  transactions: [
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
  ],
};

interface DataContextType {
  data: AppData;
  resetData: () => void;
  updateData: (newData: Partial<AppData>) => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(DEFAULT_DATA);

  const resetData = () => {
    setData(JSON.parse(JSON.stringify(DEFAULT_DATA)));
  };

  const updateData = (newData: Partial<AppData>) => {
    setData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <DataContext.Provider value={{ data, resetData, updateData }}>
      {children}
    </DataContext.Provider>
  );
};
