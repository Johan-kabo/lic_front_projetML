import StatWidget from "./StatWidget";

const StatsRow = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
      <StatWidget label="Volume Total" value="184,293" sublabel="transactions / 24h" />
      <StatWidget label="Taux de Détection" value="99.72%" sublabel="+0.03% vs avg" />
      <StatWidget label="Montant Sécurisé" value="€12.4M" sublabel="blocked today" />
      <StatWidget label="Temps Réponse API" value="23ms" sublabel="p95 latency" />
    </div>
  );
};

export default StatsRow;
