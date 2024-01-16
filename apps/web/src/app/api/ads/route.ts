import { createClient } from '@/util/supabase/server';
import { Ad } from '@repo/types';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const cookieStore = cookies();
	const client = createClient(cookieStore);

	const url = new URL(request.url);
	const advertiserId = url.searchParams.get('advertiserId');
	const networkId = url.searchParams.get('networkId');

	let query = client.from('ads').select('*');

	if (advertiserId != null) {
		query = query.eq('advertiserId', advertiserId);
	}
	if (networkId != null) {
		query = query.eq('networkId', networkId);
	}

	const rawAds = await query;

	const adsJson = rawAds.data ?? [];
	return NextResponse.json(adsJson);
}

interface CreateAdRequestBody {
	networkId: Ad['networkId'];
	advertiserId: Ad['advertiserId'];
	content: Ad['content'];
}

export async function POST(request: NextRequest) {
	const cookieStore = cookies();
	const client = createClient(cookieStore);

	const body = (await request.json()) as CreateAdRequestBody;

	if (body == null) {
		throw new Error('Missing Body');
	}

	const { networkId, content, advertiserId } = body;

	const { data, error } = await client
		.from('ads')
		.insert({
			networkId: networkId,
			advertiserId: advertiserId,
			content: content,
		})
		.select();

	if (error != null || data == null) {
		return NextResponse.json(error, { status: 500 });
	}

	return NextResponse.json(data, { status: 201 });
}

export async function DELETE(request: NextRequest) {
	try {
		const cookieStore = cookies();
		const client = createClient(cookieStore);

		const url = new URL(request.url);
		const adId = url.searchParams.get('adId');
		const advertiserId = url.searchParams.get('advertiserId');
		if (!adId) {
			throw new Error('Missing adId');
		}

		const { error } = await client
			.from('ads')
			.delete()
			.eq('advertiserId', advertiserId)
			.eq('adId', adId);

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
