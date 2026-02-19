interface TopBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "dashboard", label: "DASHBOARD" },
  { id: "predict", label: "PREDICTION" },
  { id: "assistant", label: "ASSISTANT_IA" },
];

const TopBar = ({ activeTab, onTabChange }: TopBarProps) => {
  return (
    <div className="border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="font-mono text-sm font-semibold tracking-widest text-foreground uppercase">
          XSECURE <span className="text-muted-foreground">//</span> MONITORING
        </h1>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 bg-safe animate-pulse-live" />
          <span className="font-mono text-xs font-medium tracking-wider text-safe">LIVE</span>
        </div>
      </div>
      <div className="flex gap-0 px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`font-mono text-[11px] tracking-wider px-4 py-2 border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
