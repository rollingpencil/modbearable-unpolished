import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type PolyIDParams = {
  polyid: string;
};

export async function GET(request: Request, context: { params: PolyIDParams }) {
  const polyID = parseInt(context.params.polyid, 10);  // Convert polyid from string to integer

  // Fetch diploma data based on polyID
  const diplomas = await prisma.diploma.findMany({
    where: {
      polyID: polyID
    },
    select: {
      diplomaID: true,
      name: true
    }
  });

  // Check if diplomas are found
  if (diplomas.length > 0) {
    // Transform data to match expected structure
    const transformedDiplomas = diplomas.map(diploma => ({
      dipid: `S${diploma.diplomaID}`, // Assuming a prefix 'S' for diploma IDs
      name: diploma.name
    }));

    return NextResponse.json(
      {
        courses: transformedDiplomas
      },
      { status: 200 }
    );
  } else {
    // Return empty array if no diplomas found for the given polyID
    return NextResponse.json(
      {
        courses: []
      },
      { status: 200 }
    );
  }
}
/*import { NextResponse } from "next/server";

type PolyIDParams = {
  polyid: string;
};

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request, context: { params: PolyIDParams }) {
  switch (context.params.polyid) {
    case "sp":
      return NextResponse.json(
        {
          courses: [
            {
              dipid: "S69",
              name: "Diploma in Information Technology",
            },
            {
              dipid: "S01",
              name: "Diploma in Information Security Management",
            },
          ],
        },
        { status: 200 },
      );
    default:
      return NextResponse.json(
        {
          courses: [],
        },
        { status: 200 },
      );
  }
}
*/