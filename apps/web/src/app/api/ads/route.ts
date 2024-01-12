import { createClient } from '@/app/util/supabase/server';
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

export async function POST(request: NextRequest) {
	try {
		const cookieStore = cookies();
		const client = createClient(cookieStore);

		const body = await request.json();

		if (!body) {
			throw new Error('Missing Body');
		}

		const { networkId, content, advertiserId } = body;

		const { error } = await client
			.from('ads')
			.insert([
				{
					networkId: networkId,
					advertiserId: advertiserId,
					content: content,
				},
			])
			.select();

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
