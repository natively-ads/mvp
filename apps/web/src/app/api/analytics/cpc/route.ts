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
	const publisherId = url.searchParams.get('publisherId');

	let clicksQuery = client.rpc('countclicks', {
		adid: adId,
		advertiserid: advertiserId,
		networkid: networkId,
		campaignid: campaignId,
		publisherid: publisherId,
	});

	let result = await clicksQuery;
	const clicksCount = result.data;

	let spendQuery = client.rpc('countadspend', {
		adid: adId,
		advertiserid: advertiserId,
		networkid: networkId,
		campaignid: campaignId,
		publisherid: publisherId,
	});

	result = await spendQuery;
	const totalSpend = result.data;

	if (clicksCount == 0) {
		return NextResponse.json(0);
	}

	return NextResponse.json(totalSpend / 1000 / clicksCount);
}
