import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ rooms });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { name, type, pricePerNight, maxOccupancy, description, amenities } = await req.json();
    if (!name || !type || !pricePerNight) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const room = await prisma.room.create({
      data: {
        name,
        slug,
        type,
        pricePerNight: parseInt(pricePerNight),
        maxOccupancy: parseInt(maxOccupancy) || 2,
        description: description || "",
        amenities: amenities ? amenities.split(",").map((a: string) => a.trim()) : [],
        images: [],
      },
    });
    return NextResponse.json({ room });
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json({ error: "Room with this name already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, ...data } = await req.json();
    const room = await prisma.room.update({
      where: { id },
      data: {
        ...data,
        pricePerNight: data.pricePerNight ? parseInt(data.pricePerNight) : undefined,
        amenities: data.amenities ? data.amenities.split(",").map((a: string) => a.trim()) : undefined,
      },
    });
    return NextResponse.json({ room });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await req.json();
    await prisma.room.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}