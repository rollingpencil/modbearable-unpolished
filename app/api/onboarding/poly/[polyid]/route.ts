import { NextResponse } from "next/server";

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
