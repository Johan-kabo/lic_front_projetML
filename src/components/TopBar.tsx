const TopBar = () => {
  return (
    <div className="flex items-center justify-between border-b border-border px-6 py-4">
      <h1 className="font-mono text-sm font-semibold tracking-widest text-foreground uppercase">
        FRAUD_GUARD MONITORING <span className="text-muted-foreground">//</span> SYSTEM_LOG
      </h1>
      <div className="flex items-center gap-2">
        <span className="inline-block h-2 w-2 bg-safe animate-pulse-live" />
        <span className="font-mono text-xs font-medium tracking-wider text-safe">LIVE</span>
      </div>
    </div>
  );
};

export default TopBar;
