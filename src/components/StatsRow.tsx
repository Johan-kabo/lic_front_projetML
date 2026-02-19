import StatWidget from "./StatWidget";

interface StatsRowProps {
  total: number;
  fraudRate: number;
  totalBlocked: number;
  avgLatency: number;
}

const StatsRow = ({ total, fraudRate, totalBlocked, avgLatency }: StatsRowProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
      <StatWidget label="Volume Total" value={total.toLocaleString()} sublabel="transactions" />
      <StatWidget label="Taux de Détection" value={`${(fraudRate * 100).toFixed(2)}%`} sublabel="fraud rate" />
      <StatWidget label="Montant Bloqué" value={`€${totalBlocked.toLocaleString()}`} sublabel="blocked" />
      <StatWidget label="Temps Réponse" value={`${avgLatency}ms`} sublabel="p95 latency" />
    </div>
  );
};

export default StatsRow;
