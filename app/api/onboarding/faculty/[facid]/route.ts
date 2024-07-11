import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type FacIDParams = {
  facid: string;
};

type MajorType = {
  id: number;
  name: string;
};

export async function GET(request: Request, context: { params: FacIDParams }) {
  const { facid } = context.params;

  try {
    console.log("Called /faculty/[facid]");

    const facIdNum = Number(facid);

    await prisma.$connect();

    // Fetch diplomas based on polytechnicId
    const facultyMajors: MajorType[] = await prisma.major.findMany({
      where: {
        facultyId: facIdNum,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(
      {
        majors:
          facultyMajors.length > 0
            ? facultyMajors.map((major: MajorType) => ({
                majorid: major.id,
                name: major.name,
              }))
            : [],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching majors", error);

    return NextResponse.json(
      { error: "Failed to fetch data from database." },
      { status: 500 },
    );
  }
}
