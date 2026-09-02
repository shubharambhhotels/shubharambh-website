import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { roomId, checkin, checkout, guests, name, email, phone, specialRequests } = body;

    if (!roomId || !checkin || !checkout || !name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const checkInDate = new Date(checkin);
    const checkOutDate = new Date(checkout);

    if (checkOutDate <= checkInDate) {
      return NextResponse.json({ error: "Check-out must be after check-in" }, { status: 400 });
    }

    // Check availability — look for conflicting bookings
    const conflict = await prisma.booking.findFirst({
      where: {
        roomId,
        status: { in: ["PENDING", "CONFIRMED"] },
        AND: [
          { checkIn: { lt: checkOutDate } },
          { checkOut: { gt: checkInDate } },
        ],
      },
    });

    if (conflict) {
      return NextResponse.json({ error: "Room not available for selected dates" }, { status: 409 });
    }

    // Room prices
    const prices: Record<string, number> = {
      "deluxe": 400000,
      "super-deluxe": 450000,
      "executive": 500000,
      "family-suite": 750000,
    };

    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const pricePerNight = prices[roomId] ?? 400000;
    const totalAmount = pricePerNight * nights;

    // Save booking as PENDING
    const booking = await prisma.booking.create({
      data: {
        roomId,
        guestName: name,
        guestEmail: email,
        guestPhone: phone,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        numGuests: parseInt(guests),
        totalAmount,
        status: "PENDING",
        specialRequests: specialRequests || "",
      },
    });

    return NextResponse.json({
      bookingId: booking.id,
      bookingRef: booking.bookingRef,
      nights,
      totalAmount,
      available: true,
    });

  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}