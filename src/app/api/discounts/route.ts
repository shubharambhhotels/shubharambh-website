import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const discounts = await prisma.discount.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ discounts });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, code, type, value, minNights, active, expiry } = await req.json();
    if (!name || !code || !value) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const discount = await prisma.discount.create({
      data: {
        name,
        code: code.toUpperCase(),
        type,
        value: parseInt(value),
        minNights: parseInt(minNights) || 1,
        active,
        expiry: expiry ? new Date(expiry) : null,
      },
    });
    return NextResponse.json({ discount });
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json({ error: "Promo code already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, ...data } = await req.json();
    const discount = await prisma.discount.update({
      where: { id },
      data: {
        ...data,
        value: data.value ? parseInt(data.value) : undefined,
        expiry: data.expiry ? new Date(data.expiry) : null,
      },
    });
    return NextResponse.json({ discount });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.discount.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}