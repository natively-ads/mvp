import { createClient } from '@/util/supabase/server';
import { Click } from '@repo/types';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const cookieStore = cookies();
	const client = createClient(cookieStore);

	const url = new URL(request.url);
	const advertiserId = url.searchParams.get('advertiserId');
	const networkId = url.searchParams.get('networkId');
	const adId = url.searchParams.get('adId');
	const campaignId = url.searchParams.get('campaignId');
	const publisherId = url.searchParams.get('publisherid');
	let query = client.rpc('countclicks', {
		adid: adId,
		advertiserid: advertiserId,
		networkid: networkId,
		campaignid: campaignId,
		publisherid: publisherId,
	});

	const { data, error } = await query;
	return NextResponse.json(data);
}
