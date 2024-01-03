import { NextRequest, NextResponse } from "next/server";
import getSupabaseClient from "../../../../util/supabaseClient";

export async function POST(request: NextRequest) {
  try {
    const { title, advertiserId, budget, cpmBid, networkId, adId } =
      await request.json();

    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("campaigns")
      .insert([
        {
          title: title,
          advertiserId: advertiserId,
          budget: budget,
          cpmBid: cpmBid,
          networkId: networkId,
          adId: adId,
        },
      ])
      .select();
    if (error) {
      throw new Error(error.details);
    }

    return NextResponse.json({
      data: data,
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
