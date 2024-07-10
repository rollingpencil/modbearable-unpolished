import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    console.log("Called /poly");
    await prisma.$connect();
    // Fetch polytechnic data from the database
    const polytechnics = await prisma.polytechnic.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    // Return the fetched data as JSON
    return NextResponse.json({ poly: polytechnics }, { status: 200 });
  } catch (error) {
    // Handle potential errors
    console.error("Failed to fetch polytechnics:", error);

    return NextResponse.json(
      { error: "Failed to fetch data from database." },
      { status: 500 },
    );
  }
}
