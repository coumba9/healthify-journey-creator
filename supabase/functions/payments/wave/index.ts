import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { amount } = await req.json();
    
    // Configuration Wave
    const WAVE_API_KEY = Deno.env.get("WAVE_API_KEY");
    const WAVE_API_URL = "https://api.wave.com/v1/checkout";

    // Appel à l'API Wave
    const response = await fetch(WAVE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WAVE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        currency: "XOF",
        error_url: `${req.headers.get("origin")}/payment-error`,
        success_url: `${req.headers.get("origin")}/payment-success`,
      }),
    });

    const data = await response.json();

    return new Response(
      JSON.stringify({
        success: true,
        transactionId: data.id,
        paymentUrl: data.payment_url,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});