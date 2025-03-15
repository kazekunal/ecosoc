import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("🔹 Received payment verification request:", body);

    if (!body.razorpay_payment_id || !body.razorpay_order_id || !body.razorpay_signature) {
      console.error("❌ Missing required fields in the request");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Call Razorpay to verify the payment
    const isValid = true; // TODO: Replace with actual Razorpay verification logic

    if (!isValid) {
      console.error("❌ Payment verification failed for:", body);
      return NextResponse.json({ success: false, message: "Invalid payment verification" }, { status: 400 });
    }

    console.log("✅ Payment verified successfully!");
    return NextResponse.json({ success: true, message: "Payment verified" });
  } catch (error) {
    console.error("❌ Server error in payment verification:", error);
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
