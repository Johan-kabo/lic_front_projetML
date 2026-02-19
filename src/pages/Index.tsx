import TopBar from "@/components/TopBar";
import StatsRow from "@/components/StatsRow";
import FraudChart from "@/components/FraudChart";
import RiskDistribution from "@/components/RiskDistribution";
import TransactionFeed from "@/components/TransactionFeed";
import { useFraudAPI } from "@/hooks/useFraudAPI";

const Index = () => {
  const { loading, error } = useFraudAPI();

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <div className="p-6 space-y-6">
        {error && (
          <div className="border border-red-500 bg-red-900/20 text-red-300 p-4 rounded">
            Erreur: Impossible de charger les données de l'API. Vérifiez que le serveur FastAPI est actif sur http://127.0.0.1:8000
          </div>
        )}
        
        {loading && (
          <div className="border border-border bg-card p-4 rounded text-muted-foreground">
            Chargement des données...
          </div>
        )}
        
        <StatsRow />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FraudChart />
          </div>
          <div className="lg:col-span-1">
            <RiskDistribution />
          </div>
        </div>
        <TransactionFeed />
      </div>
    </div>
  );
};

export default Index;
