/**
 * Service API pour récupérer les données depuis l'API FastAPI
 * Base URL: http://127.0.0.1:8000
 */

import { AppData, FraudChartData, RiskData, StatsData, Transaction } from "@/contexts/DataContext";

const API_BASE_URL = "http://127.0.0.1:8000";

interface APIResponse {
  status: string;
  total_logs: number;
  statistics: {
    total_approved: number;
    total_review: number;
    total_blocked: number;
    avg_fraud_probability: number;
  };
  last_prediction: {
    timestamp: string;
    model_version: string;
    fraud_probability: number;
    decision: string;
    action_required: string;
    input: Record<string, number>;
  };
  logs: Array<{
    timestamp: string;
    model_version: string;
    fraud_probability: number;
    decision: string;
    action_required: string;
    input: Record<string, number>;
  }>;
}

/**
 * Récupère les données de l'API FastAPI
 */
export const fetchFraudData = async (): Promise<AppData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/get-monitoring`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const apiData: APIResponse = await response.json();
    
    // Convertir les données API vers le format du dashboard
    const appData = mapAPIToAppData(apiData);
    
    return appData;
  } catch (error) {
    console.error("Erreur lors de la récupération des données API:", error);
    throw error;
  }
};

/**
 * Convertit les données de l'API vers le format AppData du dashboard
 */
function mapAPIToAppData(apiData: APIResponse): AppData {
  const stats = apiData.statistics;
  const logs = apiData.logs || [];
  
  // Calculer les statistiques en euros et pourcentages
  const totalTransactions = stats.total_approved + stats.total_review + stats.total_blocked;
  const totalAmount = logs.reduce((sum, log) => sum + (log.input?.Amount || 0), 0);
  
  // Approximation: montant bloqué basé sur les fraudes
  const blockedAmount = logs
    .filter(log => log.decision === "BLOCK")
    .reduce((sum, log) => sum + (log.input?.Amount || 0), 0);
  
  const stats_data: StatsData = {
    totalVolume: totalTransactions.toLocaleString(),
    detectionRate: `${(stats.avg_fraud_probability * 100).toFixed(2)}%`,
    securedAmount: `€${blockedAmount.toFixed(2)}`,
    apiResponseTime: "23ms",
  };
  
  // Créer les données du graphique de fraude (distribution par score)
  const fraudChart: FraudChartData[] = generateFraudChart(logs);
  
  // Distribution des risques
  const riskDistribution: RiskData[] = [
    {
      level: "LOW",
      count: stats.total_approved,
      color: "hsl(160 84% 39%)",
    },
    {
      level: "MED",
      count: stats.total_review,
      color: "hsl(38 92% 50%)",
    },
    {
      level: "HIGH",
      count: stats.total_blocked,
      color: "hsl(0 84% 60%)",
    },
  ];
  
  // Convertir les logs en transactions pour le tableau
  const transactions: Transaction[] = logs.map((log, index) => {
    const verdict: "SAFE" | "FRAUD" | "REVIEW" =
      log.decision === "APPROVE" ? "SAFE" :
      log.decision === "BLOCK" ? "FRAUD" :
      "REVIEW";
    
    return {
      timestamp: new Date(log.timestamp).toLocaleString("fr-FR"),
      id: `TXN-${Math.random().toString(16).substr(2, 8).toUpperCase()}`,
      probability: log.fraud_probability,
      verdict,
    };
  });
  
  return {
    stats: stats_data,
    fraudChart,
    riskDistribution,
    transactions,
  };
}

/**
 * Génère des données de graphique de fraude basées sur les logs
 */
function generateFraudChart(logs: APIResponse["logs"]): FraudChartData[] {
  if (!logs || logs.length === 0) {
    return [];
  }
  
  // Grouper par heure approximativement
  const timeScores = logs.map(log => ({
    time: new Date(log.timestamp).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    score: log.fraud_probability,
  }));
  
  // Réduire et moyenner si nécessaire
  return timeScores.slice(0, 12);
}
