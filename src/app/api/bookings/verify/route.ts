import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendBookingConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Find booking by Razorpay order ID
    const existing = await prisma.booking.findFirst({
      where: { razorpayOrderId: razorpay_order_id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Update booking to CONFIRMED
    const booking = await prisma.booking.update({
      where: { id: existing.id },
      data: {
        status: "CONFIRMED",
        paymentId: razorpay_payment_id,
      },
    });

    // Send confirmation email
    try {
      await sendBookingConfirmationEmail({
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        bookingRef: booking.bookingRef,
        roomName: booking.roomName,
        checkIn: booking.checkIn.toLocaleDateString("en-IN"),
        checkOut: booking.checkOut.toLocaleDateString("en-IN"),
        nights: Math.ceil((booking.checkOut.getTime() - booking.checkIn.getTime()) / (1000 * 60 * 60 * 24)),
        totalAmount: booking.totalAmount,
      });
    } catch (emailErr) {
      console.error("Email send failed:", emailErr);
    }

    return NextResponse.json({
      success: true,
      bookingRef: booking.bookingRef,
      roomNumber: booking.roomNumber,
      checkin: booking.checkIn,
      checkout: booking.checkOut,
      room: booking.roomName,
    });

  } catch (err) {
    console.error("Verify error:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}