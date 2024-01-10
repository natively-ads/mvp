import { createClient } from "@/app/util/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const client = createClient(cookieStore);
  const rawNetworks = await client.from("networks").select("*");
  const networksJson = rawNetworks.data ?? [];
  return NextResponse.json({ Result: networksJson });
}
