import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type MajorIDParams = {
  majorid: string;
};

type CohortType = {
  id: number;
  name: string;
};

export async function GET(
  request: Request,
  context: { params: MajorIDParams },
) {
  const { majorid } = context.params;

  try {
    console.log("Called /majors/[majorid]");

    const majorIdNum = Number(majorid);

    await prisma.$connect();

    // Fetch cohort based on majorId
    const facultyMajorCohort: CohortType[] = await prisma.cohort.findMany({
      where: {
        majorId: majorIdNum,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(
      {
        cohorts:
          facultyMajorCohort.length > 0
            ? facultyMajorCohort.map((cohort: CohortType) => ({
                cohortid: cohort.id,
                name: cohort.name,
              }))
            : [],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching cohort", error);

    return NextResponse.json(
      { error: "Failed to fetch data from database." },
      { status: 500 },
    );
  }
}
