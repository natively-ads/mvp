import { createClient } from '@/app/util/supabase/server';
import { Campaign } from '@repo/types';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const cookieStore = cookies();
	const client = createClient(cookieStore);

	const url = new URL(request.url);
	const advertiserId = url.searchParams.get('advertiserId');
	const networkId = url.searchParams.get('networkId');
	const adId = url.searchParams.get('adId');

	let query = client.from('campaigns').select('*');

	if (advertiserId != null) {
		query = query.eq('advertiserId', advertiserId);
	}
	if (networkId != null) {
		query = query.eq('networkId', networkId);
	}
	if (adId != null) {
		query = query.eq('adId', adId);
	}

	const rawCampaigns = await query;

	const campaignsJson = rawCampaigns.data ?? [];
	return NextResponse.json(campaignsJson);
}

interface CreateCampaignRequestBody {
	networkId: Campaign['networkId'];
	advertiserId: Campaign['advertiserId'];
	adId: Campaign['adId'];
	title: Campaign['title'];
	budget: Campaign['budget'];
	cpmBid: Campaign['cpmBid'];
}

export async function POST(request: NextRequest) {
	const cookieStore = cookies();
	const client = createClient(cookieStore);

	const body = (await request.json()) as CreateCampaignRequestBody;

	if (!body) {
		throw new Error('Missing Body');
	}

	const { networkId, adId, title, budget, cpmBid, advertiserId } = body;

	const { data, error } = await client
		.from('campaigns')
		.insert({
			networkId: networkId,
			advertiserId: advertiserId,
			adId: adId,
			budget: budget,
			cpmBid: cpmBid,
			title: title,
		})
		.select();

	if (error != null || data == null) {
		return NextResponse.json(
			{ error: 'Error creating campaign' },
			{ status: 500 },
		);
	}

	return NextResponse.json(data, { status: 200 });
}

export async function DELETE(request: NextRequest) {
	try {
		const cookieStore = cookies();
		const client = createClient(cookieStore);

		const url = new URL(request.url);
		const campaignId = url.searchParams.get('campaignId');
		const advertiserId = url.searchParams.get('advertiserId');
		if (!campaignId) {
			throw new Error('Missing adId');
		}

		const { error } = await client
			.from('campaigns')
			.delete()
			.eq('advertiserId', advertiserId)
			.eq('campaignId', campaignId);

		if (error) {
			throw error;
		}

		return NextResponse.json('Success');
	} catch (err: any) {
		return new NextResponse(JSON.stringify({ error: err.message }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
}
