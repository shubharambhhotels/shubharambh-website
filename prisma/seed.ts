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
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());