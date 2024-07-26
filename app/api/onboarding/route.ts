import { Course, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { Onboarding, PlannerCourseType } from "@/types";

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

    const cohort_data = await prisma.cohort.findUnique({
      where: {
        id_majorId: {
          id: data.cohort!,
          majorId: data.major!,
        },
      },
      select: {
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

    const base_req : PlannerCourseType[] = base_req_db.map((record) => {
      let br_rec: PlannerCourseType = {
        code: record.course.code,
        name: record.course.name,
        courseType: record.type.name,
        credits: record.course.credit,
        exempted: apc_course_map.has(record.course.code),
        wildcard: record.wildcard,
        creditable: true,
        add_prerequisites: [],
        take_together: [],
      };

      if (apc_course_map.has(record.course.code)) {
        apc_course_map.delete(record.course.code);
      }

      if (br_rec.code == "MA1301") {
        br_rec.exempted =
          data.mathPrereq != undefined ? data.mathPrereq : false;
        br_rec.creditable = !br_rec.exempted;
      }

      if (br_rec.code == "ES1000") {
        switch (data.qet) {
          case 3:
          case 2:
            br_rec.exempted = true;
            br_rec.creditable = false;
            break;
          case 1:
            br_rec.exempted = false;
            br_rec.creditable = true;
            break;
        }
      }

      if (br_rec.code == "ES1103") {
        switch (data.qet) {
          case 3:
            br_rec.exempted = true;
            br_rec.creditable = false;
            break;
          case 2:
          case 1:
            br_rec.exempted = false;
            br_rec.creditable = true;
            break;
        }
      }

      if (br_rec.code == "ES2660") {
        br_rec.add_prerequisites.push("ES1103");
      }

      if (data.eduBackground != "poly" && br_rec.code == "CS2101") {
        br_rec.take_together.push("CS2103");
      }

      if (data.eduBackground != "poly" && br_rec.code == "CS2103") {
        br_rec.take_together.push("CS2101");
      }

      return br_rec;
    });

    let non_base_exemptions = Array.from(apc_course_map).map(([_, v]) => {
      return {
        code: v.code,
        name: v.name,
        courseType: "Others",
        credits: v.credit,
        exempted: true,
        wildcard: false,
        creditable: true,
        add_prerequisites: [],
        take_together: [],
      };
    });

    // Return the fetched data as JSON
    return NextResponse.json(
      {
        major: major_data?.name,
        total_cu: major_data?.totalCreditUnit,
        cohort: cohort_data?.name,
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
