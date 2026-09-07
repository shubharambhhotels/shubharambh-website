import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    const discount = await prisma.discount.findFirst({
      where: {
        code: code.toUpperCase(),
        active: true,
        OR: [
          { expiry: null },
          { expiry: { gte: new Date() } },
        ],
      },
    });

    if (!discount) {
      return NextResponse.json({ error: "Invalid or expired code" }, { status: 404 });
    }

    return NextResponse.json({
      valid: true,
      type: discount.type,
      value: discount.value,
      name: discount.name,
    });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}