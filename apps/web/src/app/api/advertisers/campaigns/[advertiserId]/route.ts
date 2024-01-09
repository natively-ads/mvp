import { createClient } from "@/app/util/supabase/server";
import { advertiserId } from "@/lib/config";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { advertiserId: string } }
) {
  const cookieStore = cookies();
  const client = createClient(cookieStore);
  const rawCampaigns = await client
    .from("campaigns")
    .select("*")
    .eq("advertiserId", params.advertiserId);
  const campaignsJson = rawCampaigns.data ?? [];
  return NextResponse.json(campaignsJson);
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

    const { networkId, adId, title, budget, cpmBid } = body;

    const { error } = await client
      .from("campaigns")
      .insert([
        {
          networkId: networkId,
          advertiserId: params.advertiserId,
          adId: adId,
          budget: budget,
          cpmBid: cpmBid,
          title: title,
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
