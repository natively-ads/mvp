import { createClient } from '@/app/util/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

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
