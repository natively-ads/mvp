import { createClient } from '@/util/supabase/server';
import { Json, Network } from '@repo/types';
import Ajv from 'ajv';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	// Can either get many networks or filter by publisherId

	const cookieStore = cookies();
	const client = createClient(cookieStore);

	const url = new URL(req.url);
	const publisherId = url.searchParams.get('publisherid');
	const networkId = url.searchParams.get('networkId');
	let query = client.from('networks').select('*');

	if (publisherId != null) {
		query = query.eq('publisherId', publisherId);
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
	adFormat: Json;
}

const isValidAdSchema = (adFormat: any): boolean => {
	const ajv = new Ajv();

	const result = ajv.compile(adFormat);

	if (result.errors && result.errors.length > 0) {
		return false;
	}

	return true;
};

export async function POST(request: NextRequest) {
	const requestBody = (await request.json()) as CreateNetworkRequestBody;
	const { publisherId, name, description, reservePrice, adFormat } =
		requestBody;

	if (!isValidAdSchema(adFormat)) {
		return NextResponse.json({ error: 'Invalid ad schema' }, { status: 400 });
	}

	const cookieStore = cookies();
	const client = createClient(cookieStore);

	const response = await client
		.from('networks')
		.insert({
			publisherId,
			name,
			description,
			reservePrice,
			adFormat,
		})
		.select('networkId');

	const networkJson = response.data;

	if (response.error) {
		return NextResponse.json({ error: response.error }, { status: 500 });
	}
	return NextResponse.json({ data: networkJson });
}
