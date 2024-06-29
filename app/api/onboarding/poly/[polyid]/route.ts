import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type PolyIDParams = {
  polyid: string;
};

export async function GET(request: Request, context: { params: PolyIDParams }) {
  const { polyid } = context.params;

  try {
    // Fetch diplomas based on polytechnicId
    const diplomas = await prisma.diploma.findMany({
      where: {
        polytechnicId: polyid,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(
      {
        courses:
          diplomas.length > 0
            ? diplomas.map((diploma) => ({
                dipid: diploma.id,
                name: diploma.name,
              }))
            : [],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching diplomas:", error);

    return NextResponse.json(
      { error: "Failed to fetch data from database." },
      { status: 500 },
    );
  }
}
