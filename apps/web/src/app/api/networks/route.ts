import { createClient } from '@/util/supabase/server';
import { AdSchema, Network } from '@repo/types';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	// Can either get many networks or filter by publisherId

	const cookieStore = cookies();
	const client = createClient(cookieStore);

	const url = new URL(req.url);
	const publisherId = url.searchParams.get('publisherId');
	const networkId = url.searchParams.get('networkId');
	let query = client.from('networks').select('*');

	if (publisherId != null) {
		query = query.eq('publisher_id', publisherId);
	}
	if (networkId != null) {
		query = query.eq('networkId', networkId);
	}

	const rawNetworks = await query;

	const networksJson = rawNetworks.data ?? [];
	return NextResponse.json({ data: networksJson });
}

interface CreateNetworkRequestBody {
	publisherId: Network['publisherId'];
	name: Network['name'];
	description: Network['description'];
	reservePrice: Network['reservePrice'];
	adSchema: AdSchema;
}

const isValidAdSchema = (adSchema: AdSchema): boolean => {
	for (const adField of adSchema) {
		if (adField.type === 'string' && typeof adField.value !== 'string') {
			return false;
		} else if (adField.type === 'number' && typeof adField.value !== 'number') {
			return false;
		} else if (
			adField.type === 'boolean' &&
			typeof adField.value !== 'boolean'
		) {
			return false;
		}
		// Additional type checks can be added here if necessary
	}

	return true;
};

export async function POST(request: NextRequest) {
	const requestBody = (await request.json()) as CreateNetworkRequestBody;
	const { publisherId, name, description, reservePrice, adSchema } =
		requestBody;

	if (!isValidAdSchema(adSchema)) {
		return NextResponse.json({ error: 'Invalid ad schema' }, { status: 400 });
	}

	const cookieStore = cookies();
	const client = createClient(cookieStore);

	const rawNetwork = await client.from('networks').insert({
		publisherId,
		name,
		description,
		reservePrice,
		adFormat: adSchema,
	});

	const networkJson = rawNetwork.data ?? {};
	return NextResponse.json({ data: networkJson });
}
