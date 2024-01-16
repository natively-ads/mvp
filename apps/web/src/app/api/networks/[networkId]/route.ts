import { createClient } from '@/util/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { Network } from '@repo/types';

export async function GET({ params }: { params: { networkId: string } }) {
	const cookieStore = cookies();
	const client = createClient(cookieStore);

	let query = client
		.from('networks')
		.select('*')
		.eq('networkId', params.networkId);

	const rawNetwork = await query;
	const networkJson = rawNetwork.data ?? {};
	return NextResponse.json({ data: networkJson });
}

type UpdateNetworkRequestBody = {
	name: Network['name'];
	description: Network['description'];
	reservePrice?: Network['reservePrice'];
};

export async function PUT(
	request: NextRequest,
	{ params }: { params: { networkId: string } },
) {
	const requestBody = (await request.json()) as UpdateNetworkRequestBody;
	const { name, description, reservePrice } = requestBody;

	const updateBody: Partial<UpdateNetworkRequestBody> = {};

	// Conditionally add properties if they are not null
	if (name != null) updateBody.name = name;
	if (description != null) updateBody.description = description;
	if (reservePrice != null) updateBody.reservePrice = reservePrice;

	const cookieStore = cookies();
	const client = createClient(cookieStore);

	let query = client
		.from('networks')
		.update(updateBody)
		.eq('networkId', params.networkId);

	const rawNetwork = await query;
	const networkJson = rawNetwork.data ?? {};
	return NextResponse.json({ data: networkJson });
}
