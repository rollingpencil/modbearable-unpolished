import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
    const createManyFaculty = await prisma.faculty.createMany({
      data: FACULTY,
    });

    const createMnayMajor = await prisma.major.createMany({
        data: MAJOR
    })

    return NextResponse.json({ status: "complete" }, { status: 200 });
}

const FACULTY = [
        {
          id: "SOC",
          name: "School of Computing",
        },]
const MAJOR = [
    {   id: "CS",
        name: "Computer Science",
        totalCreditUnit: 160,
        facultyId: "SOC",
        
    },
    {id: "BZA",
        name: "Business Analystics",
        totalCreditUnit: 160,
        facultyId: "SOC",
    },
    {id: "ISC",
        name: "Information Security",
        totalCreditUnit: 160,
        facultyId: "SOC",
    },
    {id: "IS",
        name: "Information Systems",
        totalCreditUnit: 160,
        facultyId: "SOC",
    }
]

       