import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { roomId, checkin, checkout, guests, name, email, phone, amount, paymentMethod, specialRequests } = body;

    if (!roomId || !checkin || !checkout || !name || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const checkInDate = new Date(checkin);
    const checkOutDate = new Date(checkout);

    // Check availability
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

    const roomNames: Record<string, string> = {
      "deluxe": "Deluxe Room",
      "super-deluxe": "Super Deluxe Room",
      "executive": "Executive Room",
      "family-suite": "Family Suite",
    };

    const booking = await prisma.booking.create({
      data: {
        roomId,
        roomName: roomNames[roomId] ?? roomId,
        guestName: name,
        guestEmail: email || "",
        guestPhone: phone,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        numGuests: parseInt(guests) || 1,
        totalAmount: parseInt(amount) || 0,
        status: "CONFIRMED",
        specialRequests: `Payment: ${paymentMethod}. ${specialRequests || ""}`.trim(),
      },
    });

    return NextResponse.json({ success: true, bookingRef: booking.bookingRef });
  } catch (err) {
    console.error("Manual booking error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}