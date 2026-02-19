import { useData } from "@/hooks/useData";
import StatWidget from "./StatWidget";

const StatsRow = () => {
  const { data } = useData();
  const stats = data.stats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
      <StatWidget label="Volume Total" value={stats.totalVolume} sublabel="transactions / 24h" />
      <StatWidget label="Taux de Détection" value={stats.detectionRate} sublabel="+0.03% vs avg" />
      <StatWidget label="Montant Sécurisé" value={stats.securedAmount} sublabel="blocked today" />
      <StatWidget label="Temps Réponse API" value={stats.apiResponseTime} sublabel="p95 latency" />
    </div>
  );
};

export default StatsRow;
