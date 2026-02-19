import { useState } from "react";
import TopBar from "@/components/TopBar";
import DashboardTab from "@/components/DashboardTab";
import PredictionTab from "@/components/PredictionTab";
import AssistantTab from "@/components/AssistantTab";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <TopBar activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "dashboard" && <DashboardTab />}
      {activeTab === "predict" && <PredictionTab />}
      {activeTab === "assistant" && <AssistantTab />}
    </div>
  );
};

export default Index;
