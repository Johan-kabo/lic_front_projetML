import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PredictionResult {
  probability: number;
  verdict: string;
  reasoning: string;
}

const PredictionTab = () => {
  const [form, setForm] = useState({
    amount: "",
    currency: "EUR",
    country: "",
    merchant: "",
    cardType: "VISA",
    clientName: "",
    transactionTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("predict", {
        body: { transaction: form },
      });

      if (fnError) throw fnError;
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const verdictColor = result
    ? result.verdict === "FRAUD"
      ? "text-fraud"
      : result.verdict === "REVIEW"
      ? "text-alert"
      : "text-safe"
    : "";

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
        Manual Prediction — Enter Transaction Data
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">Client Name</label>
          <input
            value={form.clientName}
            onChange={(e) => update("clientName", e.target.value)}
            className="w-full bg-card border border-border px-3 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-primary"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">Amount</label>
          <input
            type="number"
            value={form.amount}
            onChange={(e) => update("amount", e.target.value)}
            className="w-full bg-card border border-border px-3 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-primary"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">Currency</label>
          <select
            value={form.currency}
            onChange={(e) => update("currency", e.target.value)}
            className="w-full bg-card border border-border px-3 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-primary"
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">Country</label>
          <input
            value={form.country}
            onChange={(e) => update("country", e.target.value)}
            placeholder="e.g. FR, US, NG"
            className="w-full bg-card border border-border px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">Merchant</label>
          <input
            value={form.merchant}
            onChange={(e) => update("merchant", e.target.value)}
            className="w-full bg-card border border-border px-3 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-primary"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">Card Type</label>
          <select
            value={form.cardType}
            onChange={(e) => update("cardType", e.target.value)}
            className="w-full bg-card border border-border px-3 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-primary"
          >
            <option value="VISA">VISA</option>
            <option value="MASTERCARD">MASTERCARD</option>
            <option value="AMEX">AMEX</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">Transaction Time</label>
          <input
            type="datetime-local"
            value={form.transactionTime}
            onChange={(e) => update("transactionTime", e.target.value)}
            className="w-full bg-card border border-border px-3 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-primary"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="font-mono text-[11px] tracking-wider px-6 py-3 border border-primary bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50"
          >
            {loading ? "ANALYZING..." : "RUN_PREDICTION"}
          </button>
        </div>
      </form>

      {error && (
        <div className="border border-fraud bg-fraud/5 p-4">
          <p className="font-mono text-xs text-fraud">{error}</p>
        </div>
      )}

      {result && (
        <div className="border border-border bg-card p-5 space-y-4">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Prediction Result
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-mono text-[11px] text-muted-foreground uppercase">Probability</p>
              <p className={`font-mono text-3xl font-semibold ${verdictColor}`}>
                {result.probability.toFixed(4)}
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] text-muted-foreground uppercase">Verdict</p>
              <span
                className={`inline-block font-mono text-sm font-semibold tracking-wider px-3 py-1 mt-1 ${
                  result.verdict === "FRAUD"
                    ? "bg-fraud text-fraud-foreground"
                    : result.verdict === "REVIEW"
                    ? "bg-alert text-alert-foreground"
                    : "bg-safe text-safe-foreground"
                }`}
              >
                {result.verdict}
              </span>
            </div>
          </div>
          <div>
            <p className="font-mono text-[11px] text-muted-foreground uppercase mb-2">Analysis</p>
            <p className="text-sm text-foreground leading-relaxed">{result.reasoning}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionTab;
