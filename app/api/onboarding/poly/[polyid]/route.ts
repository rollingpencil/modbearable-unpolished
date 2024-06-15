type PolyIDParams = {
  polyid: string;
};

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request, context: { params: PolyIDParams }) {
  switch (context.params.polyid) {
    case "sp":
      return Response.json({
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
      });
    default:
      return Response.json({
        courses: [],
      });
  }
}
