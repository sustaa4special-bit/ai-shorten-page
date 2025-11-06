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
    const { longUrl } = await req.json();
    console.log("Shortening URL:", longUrl);

    // Validate URL
    if (!longUrl || typeof longUrl !== "string") {
      return new Response(
        JSON.stringify({ error: "Please provide a valid URL" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if URL starts with http:// or https://
    if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
      return new Response(
        JSON.stringify({ error: "URL must start with http:// or https://" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if URL already exists
    const { data: existingLink } = await supabase
      .from("links")
      .select("short_code")
      .eq("long_url", longUrl)
      .maybeSingle();

    if (existingLink) {
      console.log("URL already exists with short code:", existingLink.short_code);
      return new Response(
        JSON.stringify({ 
          shortCode: existingLink.short_code,
          shortUrl: `https://urlshortner.site/${existingLink.short_code}`
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate short code using Lovable AI (Gemini)
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: "You are a short URL code generator. Generate memorable, unique, SEO-friendly short codes that are 6-8 characters long. Use only lowercase letters and numbers. Make them easy to remember and type. Return ONLY the short code, nothing else." 
          },
          { 
            role: "user", 
            content: `Generate a unique short code for this URL: ${longUrl}. Consider the domain or keywords to make it memorable. Return only the code.` 
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      console.error("AI Gateway error:", aiResponse.status, await aiResponse.text());
      // Fallback to random generation
      const fallbackCode = `sl-${Math.random().toString(36).substring(2, 8)}`;
      console.log("Using fallback short code:", fallbackCode);
      
      const { data: newLink, error: insertError } = await supabase
        .from("links")
        .insert({ long_url: longUrl, short_code: fallbackCode })
        .select("short_code")
        .single();

      if (insertError) {
        console.error("Insert error:", insertError);
        throw insertError;
      }

      return new Response(
        JSON.stringify({ 
          shortCode: newLink.short_code,
          shortUrl: `https://urlshortner.site/${newLink.short_code}`
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    let shortCode = aiData.choices?.[0]?.message?.content?.trim().toLowerCase() || "";
    
    // Clean the short code (remove any non-alphanumeric chars except hyphens)
    shortCode = shortCode.replace(/[^a-z0-9-]/g, "");
    
    // Ensure it's not empty and has reasonable length
    if (!shortCode || shortCode.length < 3) {
      shortCode = `sl-${Math.random().toString(36).substring(2, 8)}`;
    }
    
    console.log("Generated short code:", shortCode);

    // Check if short code already exists (collision)
    const { data: existingCode } = await supabase
      .from("links")
      .select("id")
      .eq("short_code", shortCode)
      .maybeSingle();

    if (existingCode) {
      // Add random suffix to make it unique
      shortCode = `${shortCode}-${Math.random().toString(36).substring(2, 5)}`;
      console.log("Collision detected, using:", shortCode);
    }

    // Save to database
    const { data: newLink, error: insertError } = await supabase
      .from("links")
      .insert({ long_url: longUrl, short_code: shortCode })
      .select("short_code")
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      throw insertError;
    }

    console.log("Successfully created short link:", newLink.short_code);

    return new Response(
      JSON.stringify({ 
        shortCode: newLink.short_code,
        shortUrl: `https://urlshortner.site/${newLink.short_code}`
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in shorten-url function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to shorten URL" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
