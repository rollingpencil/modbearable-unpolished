import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  return NextResponse.json(
    {
      requirements: [
        {
          course: "CS1101S",
          name: "Programming Methodlogy",
          credits: 4,
          exempted: true,
          wildcard: false,
        },
        {
          course: "CS1231S",
          name: "Discrete Structures",
          credits: 4,
          exempted: false,
          wildcard: false,
        },
        {
          course: "EXMPTPOLY",
          name: "Poly Exemptions",
          credits: 20,
          exempted: true,
          wildcard: false,
        },
      ],
    },
    { status: 200 },
  );
}
