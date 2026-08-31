// src/app/api/bookings/create/route.ts
import { NextRequest, NextResponse } from "next/server";
// import Razorpay from "razorpay";
// import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { roomId, checkin, checkout, guests, name, email, phone, specialRequests } = body;

    if (!roomId || !checkin || !checkout || !name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Fetch room from DB
    // const room = await prisma.room.findUnique({ where: { slug: roomId } });
    // if (!room) return NextResponse.json({ error: "Room not found" }, { status: 404 });

    // 2. Calculate nights
    const checkInDate = new Date(checkin);
    const checkOutDate = new Date(checkout);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    if (nights < 1) return NextResponse.json({ error: "Invalid dates" }, { status: 400 });

    // 3. Calculate total (paise)
    // const totalPaise = room.pricePerNight * nights * 100;

    // 4. Create Razorpay order
    // const razorpay = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID!,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET!,
    // });
    // const order = await razorpay.orders.create({
    //   amount: totalPaise,
    //   currency: "INR",
    //   receipt: `booking_${Date.now()}`,
    // });

    // 5. Save pending booking
    // const booking = await prisma.booking.create({
    //   data: {
    //     roomId: room.id,
    //     guestName: name,
    //     guestEmail: email,
    //     guestPhone: phone,
    //     checkIn: checkInDate,
    //     checkOut: checkOutDate,
    //     numGuests: parseInt(guests),
    //     totalAmount: totalPaise,
    //     razorpayOrderId: order.id,
    //     specialRequests,
    //   },
    // });

    // Return stub response until Razorpay keys are configured:
    return NextResponse.json({
      orderId: "order_stub_" + Date.now(),
      amount: 350000, // stub: ₹3500 in paise
      currency: "INR",
      bookingRef: "BKG" + Date.now(),
      nights,
    });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
