import fetch from "node-fetch";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const inputs = JSON.parse(event.body || "{}");

    const { read_from, read_to } = inputs;
    const difyResp = await fetch("https://api.dify.ai/v1/workflows/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.dify_api}`
      },
      body: JSON.stringify({
        query: `Data from ${read_from} to ${read_to}`,
        user: "local-user"
      })
    });

    if (!difyResp.ok) {
      const errorText = await difyResp.text();
      return {
        statusCode: difyResp.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: `Dify API Error: ${difyResp.statusText}`, details: errorText })
      };
    }

    const json = await difyResp.json();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
