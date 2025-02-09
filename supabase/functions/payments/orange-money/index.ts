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
    
    // Configuration Orange Money
    const ORANGE_MONEY_API_KEY = Deno.env.get("ORANGE_MONEY_API_KEY");
    const ORANGE_MONEY_API_URL = "https://api.orange.com/orange-money-webpay/dev/v1/webpayment";

    // Appel à l'API Orange Money
    const response = await fetch(ORANGE_MONEY_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${ORANGE_MONEY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        currency: "XOF",
        order_id: crypto.randomUUID(),
        return_url: `${req.headers.get("origin")}/payment-success`,
        cancel_url: `${req.headers.get("origin")}/payment-error`,
      }),
    });

    const data = await response.json();

    return new Response(
      JSON.stringify({
        success: true,
        transactionId: data.pay_token,
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