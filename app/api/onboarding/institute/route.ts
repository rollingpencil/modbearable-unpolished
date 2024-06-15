export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  return Response.json({
    institutues: [
      {
        instituteid: "jc",
        name: "Junior College",
      },
      {
        instituteid: "ib",
        name: "International Baccalaureate",
      },
      {
        instituteid: "poly",
        name: "Polytechnic",
      },
    ],
  });
}
