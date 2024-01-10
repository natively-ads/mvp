import { createClient } from '@/app/util/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	// Can either get many networks or filter by publisherId

	const cookieStore = cookies();
	const client = createClient(cookieStore);

	const url = new URL(req.url);
	const publisherId = url.searchParams.get('publisherId');

	let query = client.from('networks').select('*');

	if (publisherId != null) {
		query = query.eq('publisher_id', publisherId);
	}

	const rawNetworks = await query;

	const networksJson = rawNetworks.data ?? [];
	return NextResponse.json({ Result: networksJson });
}

export async function POST(req: NextRequest) {}
