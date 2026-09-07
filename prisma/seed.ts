import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const rooms = [
    // Deluxe — Floor 1
    { roomNumber: "001", category: "deluxe", floor: 1 },
    { roomNumber: "002", category: "deluxe", floor: 1 },
    { roomNumber: "201", category: "deluxe", floor: 1 },
    { roomNumber: "202", category: "deluxe", floor: 1 },
    { roomNumber: "204", category: "deluxe", floor: 1 },
    // Super Deluxe — Floor 2
    { roomNumber: "301", category: "super-deluxe", floor: 2 },
    { roomNumber: "303", category: "super-deluxe", floor: 2 },
    { roomNumber: "308", category: "super-deluxe", floor: 2 },
    { roomNumber: "309", category: "super-deluxe", floor: 2 },
    { roomNumber: "310", category: "super-deluxe", floor: 2 },
    // Executive — Floor 3
    { roomNumber: "304", category: "executive", floor: 3 },
    { roomNumber: "305", category: "executive", floor: 3 },
    { roomNumber: "306", category: "executive", floor: 3 },
    { roomNumber: "307", category: "executive", floor: 3 },
    // Suite — Floor 4
    { roomNumber: "302", category: "family-suite", floor: 4 },
  ];

  for (const room of rooms) {
    await prisma.roomInventory.upsert({
      where: { roomNumber: room.roomNumber },
      update: {},
      create: room,
    });
  }
  console.log("Seeded 15 rooms successfully.");

  const discountsData = [
    { name: "Early Bird Offer", code: "EARLY20", type: "Percentage", value: 20, minNights: 2, active: true },
    { name: "Long Stay Discount", code: "STAY500", type: "Flat", value: 500, minNights: 3, active: true },
    { name: "Diwali Special", code: "DIWALI15", type: "Percentage", value: 15, minNights: 1, active: false },
  ];

  for (const d of discountsData) {
    await prisma.discount.upsert({
      where: { code: d.code },
      update: {},
      create: d,
    });
  }
  console.log("Seeded discounts successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());