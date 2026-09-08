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
  console.log("Seeded discounts successfully.");

  const roomCategories = [
    {
      name: "Deluxe Room",
      slug: "deluxe",
      type: "DELUXE" as const,
      pricePerNight: 4000,
      maxOccupancy: 2,
      description: "Spacious room overlooking the Himalayan ridgeline and Pithoragarh valley.",
      amenities: ["Mountain View", "King Bed", "Free WiFi", "Hot Water", "Room Service"],
      images: [],
      isActive: true,
    },
    {
      name: "Super Deluxe Room",
      slug: "super-deluxe",
      type: "SUPER_DELUXE" as const,
      pricePerNight: 4500,
      maxOccupancy: 2,
      description: "Contemporary room with garden and valley views, premium linens, and all modern amenities.",
      amenities: ["Garden View", "Queen Bed", "Smart TV", "Free WiFi", "Hot Water"],
      images: [],
      isActive: true,
    },
    {
      name: "Executive Room",
      slug: "executive",
      type: "SUITE" as const,
      pricePerNight: 5000,
      maxOccupancy: 2,
      description: "Premium room with AC, private balcony, and panoramic snow-peak views.",
      amenities: ["Panoramic View", "Private Balcony", "AC", "Smart TV", "Safe/Locker"],
      images: [],
      isActive: true,
    },
    {
      name: "Family Suite",
      slug: "family-suite",
      type: "FAMILY" as const,
      pricePerNight: 7500,
      maxOccupancy: 4,
      description: "Spacious suite with living area, AC, private balcony, and mountain-facing windows.",
      amenities: ["Living Area", "AC", "Balcony", "Smart TV", "Safe/Locker", "Hot Water"],
      images: [],
      isActive: true,
    },
  ];

  for (const r of roomCategories) {
    await prisma.room.upsert({
      where: { slug: r.slug },
      update: {},
      create: r,
    });
  }
  console.log("Seeded room categories successfully.");
  }  
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());