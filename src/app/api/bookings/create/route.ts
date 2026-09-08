import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Razorpay from "razorpay";

const roomNames: Record<string, string> = {
  "deluxe": "Deluxe Room",
  "super-deluxe": "Super Deluxe Room",
  "executive": "Executive Room",
  "family-suite": "Family Suite",
};

const prices: Record<string, number> = {
  "deluxe": 400000,
  "super-deluxe": 450000,
  "executive": 500000,
  "family-suite": 750000,
};

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { roomId, checkin, checkout, guests, name, email, phone, specialRequests, discountCode } = body;
    // clientTotal removed entirely — it's no longer read anywhere, so no reason to destructure it

    if (!roomId || !checkin || !checkout || !name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const checkInDate = new Date(checkin);
    const checkOutDate = new Date(checkout);
    if (checkOutDate <= checkInDate) {
      return NextResponse.json({ error: "Check-out must be after check-in" }, { status: 400 });
    }

    const bookedRooms = await prisma.booking.findMany({
      where: {
        roomId,
        status: { in: ["PENDING", "CONFIRMED"] },
        AND: [{ checkIn: { lt: checkOutDate } }, { checkOut: { gt: checkInDate } }],
      },
      select: { roomNumber: true },
    });
    const bookedNumbers = bookedRooms.map((b) => b.roomNumber).filter(Boolean) as string[];

    const assignedRoom = await prisma.roomInventory.findFirst({
      where: { category: roomId, isActive: true, roomNumber: { notIn: bookedNumbers } },
      orderBy: { roomNumber: "asc" },
    });
    if (!assignedRoom) {
      return NextResponse.json(
        { error: "No rooms available for selected dates. Please choose different dates or another room type." },
        { status: 409 }
      );
    }

    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

    const pricePerNight = prices[roomId] ?? 400000;
    const numGuests = parseInt(guests) || 1;
    const extraPersons = numGuests > 2 ? numGuests - 2 : 0;
    const extraPersonCharge = extraPersons * 150000;
    const subtotal = pricePerNight * nights + extraPersonCharge;

    let discountAmount = 0;
    if (discountCode) {
      const discount = await prisma.discount.findFirst({
        where: {
          code: discountCode.toUpperCase(),
          active: true,
          OR: [{ expiry: null }, { expiry: { gte: new Date() } }],
        },
      });
      if (discount && nights >= discount.minNights) {  // ← the fix
        discountAmount = discount.type === "Percentage"
          ? Math.round(subtotal * discount.value / 100)
          : discount.value * 100;
      }
    }

    const afterDiscount = subtotal - discountAmount;
    const gstRate = pricePerNight >= 750000 ? 0.18 : 0.12;
    const gstAmount = Math.round(afterDiscount * gstRate);
    const totalAmount = afterDiscount + gstAmount;

    const order = await razorpay.orders.create({
      amount: totalAmount,
      currency: "INR",
      receipt: `booking_${Date.now()}`,
    });

    const booking = await prisma.booking.create({
      data: {
        roomId, roomName: roomNames[roomId] ?? roomId, roomNumber: assignedRoom.roomNumber,
        guestName: name, guestEmail: email, guestPhone: phone,
        checkIn: checkInDate, checkOut: checkOutDate, numGuests,
        totalAmount, status: "PENDING", razorpayOrderId: order.id,
        specialRequests: specialRequests || "",
      },
    });

    return NextResponse.json({
      bookingId: booking.id, bookingRef: booking.bookingRef, roomNumber: assignedRoom.roomNumber,
      orderId: order.id, nights, totalAmount, available: true,
    });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}