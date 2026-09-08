import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ bookings });
  } catch (err) {
    console.error("Admin bookings error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();

    const statusMap: Record<string, "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED"> = {
      Pending: "PENDING",
      Confirmed: "CONFIRMED",
      Cancelled: "CANCELLED",
      Completed: "COMPLETED",
    };
    const mappedStatus = statusMap[status] ?? status;

    const booking = await prisma.booking.update({
      where: { id },
      data: { status: mappedStatus },
    });
    return NextResponse.json({ booking });
  } catch (err) {
    console.error("Update booking error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}