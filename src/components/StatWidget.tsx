interface StatWidgetProps {
  label: string;
  value: string;
  sublabel?: string;
}

const StatWidget = ({ label, value, sublabel }: StatWidgetProps) => {
  return (
    <div className="border border-border bg-card p-5">
      <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase mb-3">
        {label}
      </p>
      <p className="font-mono text-2xl font-semibold text-foreground">{value}</p>
      {sublabel && (
        <p className="font-mono text-xs text-muted-foreground mt-1">{sublabel}</p>
      )}
    </div>
  );
};

export default StatWidget;
