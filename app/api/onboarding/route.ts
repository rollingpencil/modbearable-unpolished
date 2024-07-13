import { Course, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { Onboarding } from "@/types";

export const dynamic = "force-dynamic"; // defaults to auto

const prisma = new PrismaClient();

export async function POST(request: Request) {
  console.log("Called /onboarding");
  let data: Onboarding = await request.json();

  if (!("eduBackground" in data)) {
    return NextResponse.json({ error: "Invalid data." }, { status: 400 });
  }

  let dataIntegrity: boolean = true;

  switch (data.eduBackground) {
    case "poly":
      dataIntegrity = dataIntegrity && "poly" in data && data.poly != undefined;
      dataIntegrity =
        dataIntegrity && "diploma" in data && data.diploma != undefined;
    case "jc":
    case "ib":
      dataIntegrity =
        dataIntegrity && "major" in data && data.major != undefined;
      dataIntegrity =
        dataIntegrity && "cohort" in data && data.cohort != undefined;
      dataIntegrity = dataIntegrity && "qet" in data && data.qet != undefined;
      dataIntegrity =
        dataIntegrity && "mathPrereq" in data && data.mathPrereq != undefined;
      break;
  }

  if (dataIntegrity == false) {
    return NextResponse.json({ error: "Invalid data." }, { status: 400 });
  }

  try {
    await prisma.$connect();
    // Fetch polytechnic data from the database
    const major_data = await prisma.major.findUnique({
      where: {
        id: data.major,
      },
      select: {
        totalCreditUnit: true,
        name: true,
      },
    });

    const base_req_db = await prisma.curriculum.findMany({
      where: {
        majorId: data.major,
        cohortId: data.cohort,
      },
      select: {
        course: true,
        type: true,
        wildcard: true,
      },
    });

    let apc_course_db: Course[] = [];

    if ("diploma" in data) {
      apc_course_db = (
        await prisma.aPC.findMany({
          where: {
            majorId: data.major,
            diplomaId: data.diploma,
          },
          select: {
            course: true,
          },
        })
      ).map((rec) => rec.course);
    }

    let apc_course_map = new Map(apc_course_db.map((c) => [c.code, c]));

    const base_req = base_req_db.map((record) => {
      let br_rec = {
        code: record.course.code,
        name: record.course.name,
        courseType: record.type.name,
        credits: record.course.credit,
        exempted: apc_course_map.has(record.course.code),
        wildcard: record.wildcard,
      };

      if (apc_course_map.has(record.course.code)) {
        apc_course_map.delete(record.course.code);
      }

      if (br_rec.code == "MA1301") {
        br_rec.exempted =
          data.mathPrereq != undefined ? data.mathPrereq : false;
      }

      if (br_rec.code == "ES1000") {
        switch (data.qet) {
          case 3:
          case 2:
            br_rec.exempted = true;
            break;
          case 1:
            br_rec.exempted = false;
            break;
        }
      }

      if (br_rec.code == "ES1103") {
        switch (data.qet) {
          case 3:
            br_rec.exempted = true;
            break;
          case 2:
          case 1:
            br_rec.exempted = false;
            break;
        }
      }

      return br_rec;
    });

    let non_base_exemptions = Array.from(apc_course_map).map(([_, v]) => {
      return {
        ...v,
        exempted: true,
        wildcard: false,
      };
    });

    // Return the fetched data as JSON
    return NextResponse.json(
      {
        total_cu: major_data?.totalCreditUnit,
        exempted_math: data.mathPrereq,
        base_requirements: base_req,
        non_base_exemptions: non_base_exemptions,
        user_defined_courses: [],
        user_schedule: [],
      },
      { status: 200 },
    );
  } catch (error) {
    // Handle potential errors
    console.error("Failed to fetch initial schedule:", error);

    return NextResponse.json(
      { error: "Failed to fetch data from database." },
      { status: 500 },
    );
  }
}
