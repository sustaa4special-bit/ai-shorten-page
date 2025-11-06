import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { shortCode } = await req.json();
    console.log("Looking up short code:", shortCode);

    if (!shortCode || typeof shortCode !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid short code" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the link
    const { data: link, error: fetchError } = await supabase
      .from("links")
      .select("id, long_url, clicks")
      .eq("short_code", shortCode)
      .maybeSingle();

    if (fetchError) {
      console.error("Fetch error:", fetchError);
      throw fetchError;
    }

    if (!link) {
      console.log("Short code not found:", shortCode);
      return new Response(
        JSON.stringify({ error: "Link not found or expired" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Found link:", link.long_url, "Current clicks:", link.clicks);

    // Increment click count
    const { error: updateError } = await supabase
      .from("links")
      .update({ clicks: link.clicks + 1 })
      .eq("id", link.id);

    if (updateError) {
      console.error("Update error:", updateError);
      // Don't fail the redirect if click tracking fails
    }

    console.log("Successfully incremented clicks for:", shortCode);

    return new Response(
      JSON.stringify({ longUrl: link.long_url }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in redirect function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to redirect" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
