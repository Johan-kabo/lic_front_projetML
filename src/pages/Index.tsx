import TopBar from "@/components/TopBar";
import StatsRow from "@/components/StatsRow";
import FraudChart from "@/components/FraudChart";
import RiskDistribution from "@/components/RiskDistribution";
import TransactionFeed from "@/components/TransactionFeed";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <div className="p-6 space-y-6">
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
