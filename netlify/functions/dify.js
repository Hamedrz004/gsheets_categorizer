import fetch from "node-fetch";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const inputs = JSON.parse(event.body || "{}");

    const difyResp = await fetch("https://api.dify.ai/v1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.dify_api}`
      },
      body: JSON.stringify({ inputs })
    });

    const json = await difyResp.json();
    return {
      statusCode: difyResp.ok ? 200 : difyResp.status,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
