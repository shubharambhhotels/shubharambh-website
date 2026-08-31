// src/app/api/bookings/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
// import { prisma } from "@/lib/prisma";
// import { sendBookingConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    // Verify Razorpay signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Update booking status in DB
    // await prisma.booking.update({
    //   where: { razorpayOrderId: razorpay_order_id },
    //   data: { status: "CONFIRMED", paymentId: razorpay_payment_id },
    // });

    // Send confirmation email
    // await sendBookingConfirmationEmail(booking);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Verify error:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
