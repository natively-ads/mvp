import { createClient } from "@/app/util/supabase/server";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { advertiserId: string } }
) {
  const cookieStore = cookies();
  const client = createClient(cookieStore);
  const rawAds = await client
    .from("ads")
    .select("*")
    .eq("advertiserId", params.advertiserId);
  const adsJson = rawAds.data ?? [];
  return NextResponse.json(adsJson);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { advertiserId: string } }
) {
  try {
    const cookieStore = cookies();
    const client = createClient(cookieStore);

    const body = await request.json();

    if (!body) {
      throw new Error("Missing Body");
    }

    const { networkId, content } = body;

    const { error } = await client
      .from("ads")
      .insert([
        {
          networkId: networkId,
          advertiserId: params.advertiserId,
          content: content,
        },
      ])
      .select();

    if (error) {
      throw error;
    }
    return NextResponse.json("Success");
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
