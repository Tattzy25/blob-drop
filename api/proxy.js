export default async function handler(req, res) {
  // Allow your Vercel frontend to call this
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const WEBHOOK_URL =
    "https://trigger.ai-plugin.io/triggers/webhook/We3kRRrAQHyvX9Cv2epaSvgy";

  try {
    const upstream = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const contentType = upstream.headers.get("content-type") || "";
    let data;
    if (contentType.includes("application/json")) {
      data = await upstream.json();
    } else {
      const text = await upstream.text();
      try {
        data = JSON.parse(text);
      } catch {
        data = { raw_response: text };
      }
    }

    return res.status(upstream.status).json(data);
  } catch (err) {
    return res
      .status(502)
      .json({ error: "Upstream webhook failed", detail: err.message });
  }
}
