import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  return NextResponse.json(
    {
      poly: [
        {
          id: "sp",
          name: "Singapore Polytechnic",
        },
        {
          id: "np",
          name: "Ngee Ann Polytechnic",
        },
        {
          id: "nyp",
          name: "Nanyang Polytechnic",
        },
        {
          id: "rp",
          name: "Republic Polytechnic",
        },
        {
          id: "tp",
          name: "Temasek Polytechnic",
        },
      ],
    },
    { status: 200 },
  );
}
