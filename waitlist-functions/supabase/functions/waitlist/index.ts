// supabase/functions/waitlist/index.ts

import { createClient } from "npm:@supabase/supabase-js@2.48.0";

const allowedOrigins = new Set([
  "https://simple-budget.app",
  "https://www.simple-budget.app",
  "http://localhost",
  "http://localhost:3000",
  "http://localhost:4321",
  "http://localhost:5500",
  "http://127.0.0.1",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:4321",
  "http://127.0.0.1:5500",
  "http://0.0.0.0",
  "http://0.0.0.0:5500",
]);

function buildCorsHeaders(origin: string) {
  const allowed = allowedOrigins.has(origin)
    ? origin
    : "https://simple-budget.app";

  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

Deno.serve(async (req: Request) => {
  const corsHeaders = buildCorsHeaders(req.headers.get("origin") || "");

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  }

  try {
    const { email, source, page_url } = await req.json();

    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ error: "Email required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceKey) {
      return new Response(JSON.stringify({ error: "Server misconfigured" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    const { error } = await supabase.from("waitlist_signups").insert({
      email,
      source: source || "unknown",
      page_url: page_url || null,
    });

    if (error) {
      console.error("Insert error:", error);
      return new Response(JSON.stringify({ error: "Insert failed" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (e) {
    console.error("Unexpected error:", e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  }
});
