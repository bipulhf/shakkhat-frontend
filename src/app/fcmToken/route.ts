import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const { token } = JSON.parse(body);
  console.log(token);
  // Save token to your database
  // Example: await saveTokenToDatabase(token);

  return NextResponse.json({ message: "Token saved successfully" });
}
