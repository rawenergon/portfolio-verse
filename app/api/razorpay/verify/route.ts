import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      templateSlug 
    } = body;

    const key_secret = process.env.RAZORPAY_KEY_SECRET || "FRJRWIUo3Uzyf8WnGztE9K4x";

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required verification fields" },
        { status: 400 }
      );
    }

    // Verify HMAC-SHA256 signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac("sha256", key_secret)
      .update(text)
      .digest("hex");

    const isMatch = generated_signature === razorpay_signature;

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid payment signature", verified: false },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      message: "Payment successfully verified by Razorpay Live",
    });
  } catch (err: any) {
    console.error("Payment verification error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to verify payment" },
      { status: 500 }
    );
  }
}
