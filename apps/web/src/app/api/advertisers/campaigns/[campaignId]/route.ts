import { NextRequest, NextResponse } from "next/server";
import getSupabaseClient from "../../../../../util/supabaseClient";
import { Tables } from "@repo/types/src/database";

export async function GET(
  request: NextRequest,
  { params }: { params: { campaignId: string } },
) {
  try {
    const campaignId = params.campaignId;

    const supabase = getSupabaseClient();
    const rawCampaign = await supabase
      .from("campaigns")
      .select("*")
      .eq("campaignId", campaignId);

    if (!rawCampaign || !rawCampaign.data || rawCampaign.data.length === 0) {
      throw new Error(`No campaign found with id: ${campaignId}`);
    }

    const campaign: Tables<"campaigns"> | undefined = rawCampaign.data[0];
    if (!campaign) {
      throw new Error(`No campaign with id ${campaignId}`);
    }

    return NextResponse.json({
      data: campaign,
      status: 200,
    });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({
      error: err.message,
      status: 400,
    });
  }
}
