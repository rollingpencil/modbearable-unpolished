import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

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
        polytechnicId: polyid
      },
      select: {
        id: true,
        name: true
      }
    });

    if (diplomas.length > 0) {
      // Transform data to match expected structure
      const transformedDiplomas = diplomas.map(diploma => ({
        dipid: diploma.id,
        name: diploma.name
      }));

      return NextResponse.json(
        {
          courses: transformedDiplomas
        },
        { status: 200 }
      );
    } else {
      // Return an empty array if no diplomas found
      return NextResponse.json(
        {
          courses: []
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error fetching diplomas:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from database." },
      { status: 500 }
    );
  }
}