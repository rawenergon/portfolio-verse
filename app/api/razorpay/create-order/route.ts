import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      templateId, 
      templateSlug, 
      price = 69, 
      title = "Template",
      customerEmail = "",
      customerPhone = "",
      licenseType = "single"
    } = body;

    const key_id = process.env.RAZORPAY_KEY_ID || "rzp_live_Tzwme978z4OZoj";
    const key_secret = process.env.RAZORPAY_KEY_SECRET || "FRJRWIUo3Uzyf8WnGztE9K4x";

    if (!key_id || !key_secret) {
      return NextResponse.json(
        { error: "Razorpay credentials not configured" },
        { status: 500 }
      );
    }

    const instance = new Razorpay({
      key_id,
      key_secret,
    });

    const amountInPaise = Math.round(Number(price) * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_${(templateSlug || "cv").slice(0, 8)}_${Date.now().toString().slice(-6)}`,
      notes: {
        templateId: String(templateId || "1"),
        templateSlug: String(templateSlug || "ccidcop"),
        title: String(title),
        customerEmail: String(customerEmail),
        customerPhone: String(customerPhone),
        licenseType: String(licenseType),
        platform: "CV.VERSE PRO",
      },
    };

    const order = await instance.orders.create(options);

    console.log(`[Razorpay Order Created] ID: ${order.id} | Email: ${customerEmail} | Phone: ${customerPhone} | Amount: ₹${price}`);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: key_id,
    });
  } catch (err: any) {
    console.error("Razorpay order creation error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
