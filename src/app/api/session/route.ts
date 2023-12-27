import { AuthOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(AuthOptions);

  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}
