import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const { amount, currency } = await req.json();

    if (!amount || !currency) {
      console.error("❌ Missing amount or currency");
      return new Response(JSON.stringify({ error: "Amount and currency are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("🔹 Received API request:", { amount, currency });

    // Debugging: Log the environment variables
    console.log("🔑 Checking Razorpay API Keys...");
    console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID ? "✅ Loaded" : "❌ Missing");
    console.log("RAZORPAY_SECRET:", process.env.RAZORPAY_SECRET ? "✅ Loaded" : "❌ Missing");

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
      console.error("❌ Razorpay API keys are missing");
      return new Response(JSON.stringify({ error: "Razorpay API keys missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    console.log("🔹 Creating Razorpay order...");
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    });

    console.log("✅ Razorpay Order Created:", order);

    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("❌ Razorpay API Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
