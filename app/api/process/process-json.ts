import { NextResponse } from "next/server";


export async function GET(request: Request) {
    console.log("Called /process-json");

    try {
      const response = await fetch('https://api.sampleapis.com/coffee/hot');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      console.error('Error fetching data:', error);
      return NextResponse.json({ error: 'Failed to fetch data from API.' }, { status: 500 });
    }
  }

