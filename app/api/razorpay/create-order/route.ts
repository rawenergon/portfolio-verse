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
      currency = "INR",
      country = "IN",
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

    const targetCurrency = String(currency || "INR").toUpperCase().trim();
    // In all Razorpay-supported currencies (INR in paise, USD/EUR/GBP/CAD/AUD/SGD in cents),
    // subunits = amount * 100
    const amountInSubunits = Math.round(Number(price) * 100);

    const options: any = {
      amount: amountInSubunits,
      currency: targetCurrency,
      receipt: `rcpt_${targetCurrency.toLowerCase()}_${(templateSlug || "cv").slice(0, 6)}_${Date.now().toString().slice(-6)}`,
      notes: {
        templateId: String(templateId || "1"),
        templateSlug: String(templateSlug || "ccidcop"),
        title: String(title),
        customerEmail: String(customerEmail),
        customerPhone: String(customerPhone),
        licenseType: String(licenseType),
        currency: targetCurrency,
        country: String(country || "IN"),
        platform: "CV.VERSE",
      },
    };

    let order;
    try {
      order = await instance.orders.create(options);
    } catch (orderErr: any) {
      console.warn(`Direct order in ${targetCurrency} failed, trying fallback:`, orderErr?.message);
      // Fallback: If merchant account lacks multi-currency activation for a specific currency,
      // create INR order with converted equivalent so payment can still succeed with international card
      if (targetCurrency !== "INR") {
        const inrEquivalent = Math.round(Number(price) * 88 * 100); // approximate conversion
        const fallbackOptions = {
          ...options,
          amount: inrEquivalent,
          currency: "INR",
          notes: {
            ...options.notes,
            fallbackFromCurrency: targetCurrency,
            originalPrice: String(price),
          },
        };
        order = await instance.orders.create(fallbackOptions);
      } else {
        throw orderErr;
      }
    }

    console.log(
      `[Razorpay Order Created] ID: ${order.id} | Email: ${customerEmail} | Currency: ${order.currency} | Amount: ${Number(order.amount) / 100} | Country: ${country}`
    );

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
