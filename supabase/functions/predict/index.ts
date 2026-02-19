import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { transaction } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are a fraud detection AI model for the XSecure banking security platform. 
Analyze the transaction data and return a JSON response with:
- probability: a float between 0 and 1 representing the fraud probability
- verdict: "SAFE" (prob < 0.3), "REVIEW" (0.3-0.7), or "FRAUD" (> 0.7)
- reasoning: a brief explanation in French of why this transaction is flagged or not

Consider these risk factors:
- High amounts (>5000) increase risk
- Countries like NG, RU, CN are higher risk
- Unknown merchants are higher risk
- Late night transactions are riskier
- AMEX cards have different patterns

Respond ONLY with valid JSON, no markdown.`,
          },
          {
            role: "user",
            content: `Analyze this transaction: ${JSON.stringify(transaction)}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "fraud_prediction",
              description: "Return fraud prediction result",
              parameters: {
                type: "object",
                properties: {
                  probability: { type: "number", description: "Fraud probability 0-1" },
                  verdict: { type: "string", enum: ["SAFE", "REVIEW", "FRAUD"] },
                  reasoning: { type: "string", description: "Brief explanation in French" },
                },
                required: ["probability", "verdict", "reasoning"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "fraud_prediction" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted, please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    let result;
    if (toolCall) {
      result = JSON.parse(toolCall.function.arguments);
    } else {
      // Fallback: try parsing content as JSON
      const content = data.choices?.[0]?.message?.content || "";
      result = JSON.parse(content);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("predict error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
