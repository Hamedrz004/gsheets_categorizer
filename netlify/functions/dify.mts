import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "https://hamedrz004.github.io",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const inputs = await req.json();
    const { read_from, read_to } = inputs;

    const difyResp = await fetch("https://api.dify.ai/v1/workflows/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Netlify.env.get("dify_api")}`
      },
      body: JSON.stringify({
        query: `Data from ${read_from} to ${read_to}`,
        user: "local-user"
      })
    });

    if (!difyResp.ok) {
      const errorText = await difyResp.text();
      return new Response(
        JSON.stringify({ 
          error: `Dify API Error: ${difyResp.statusText}`, 
          details: errorText 
        }),
        { 
          status: difyResp.status,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://hamedrz004.github.io"
          }
        }
      );
    }

    const json = await difyResp.json();
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://hamedrz004.github.io",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { 
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://hamedrz004.github.io"
        }
      }
    );
  }
}
