import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET(request: Request) {
  // Fetch polytechnic data from the database, including diplomas if needed
  const polytechnics = await prisma.polytechnic.findMany({
    select: {
      polyID: true,
      name: true,
      Diplomas: {
        select: {
          diplomaID: true,
          name: true
        }
      }
    }
  });

  // Transform data to match expected structure
  const transformedPolytechnics = polytechnics.map(poly => ({
    id: poly.polyID.toString(), 
    name: poly.name,
    diplomas: poly.Diplomas.map(d => ({
      id: d.diplomaID,
      name: d.name
    }))
  }));

  return NextResponse.json(
    {
      poly: transformedPolytechnics
    },
    { status: 200 }
  );
}
