import { Ad, Campaign, Network, Impression } from '@repo/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { Json } from '@repo/types';
export async function holdSecondPriceCPMAuction(
	networkId: string,
	dbClient: SupabaseClient<any, 'public', any>,
): Promise<{
	adContent: Json;
	impressionsId: number;
}> {
	const [validCampaigns, network] = await Promise.all([
		getValidCampaigns(networkId, dbClient),
		getNetwork(networkId, dbClient),
	]);

	validCampaigns.sort((a, b) => b.cpmBid - a.cpmBid);
	if (validCampaigns.length == 0) {
		return { adContent: {}, impressionsId: -1 };
	}
	const winner = computeWinner(validCampaigns);
	const price = computePrice(validCampaigns, network);

	const [ad, impression] = await Promise.all([
		getAd(winner.adId, dbClient),
		addImpression(winner.campaignId, price, dbClient),
	]);

	return { adContent: ad.content, impressionsId: impression.impressionId };
}

async function getValidCampaigns(
	networkId: string,
	dbClient: SupabaseClient<any, 'public', any>,
): Promise<Campaign[]> {
	let query = dbClient.rpc('get_active_campaigns', {
		_networkid: networkId,
	});

	const { data, error } = await query;
	const activeCampaigns = data as Campaign[];
	return activeCampaigns;
}
async function addImpression(
	campaignId: number,
	price: number,
	dbClient: SupabaseClient<any, 'public', any>,
): Promise<Impression> {
	let query = dbClient
		.from('impressions')
		.insert([
			{
				campaignId: campaignId,
				price: price,
				adShown: false,
			},
		])
		.select('*');
	const { data, error } = await query;
	const impression = data![0] as Impression;
	return impression;
}

async function getNetwork(
	networkId: string,
	dbClient: SupabaseClient<any, 'public', any>,
) {
	const { data, error } = await dbClient
		.from('networks')
		.select('*')
		.eq('networkId', networkId);
	if (!data) {
		throw Error('error finding network');
	}
	return data[0] ?? undefined;
}

async function getAd(
	adId: number,
	dbClient: SupabaseClient<any, 'public', any>,
): Promise<Ad> {
	const { data, error } = await dbClient
		.from('ads')
		.select('*')
		.eq('adId', adId);
	if (!data) {
		throw Error('error finding ad');
	}
	return data[0] ?? undefined;
}

function computeWinner(campaigns: Campaign[]): Campaign {
	if (campaigns.length == 1) {
		return campaigns[0]!;
	}

	const validWinners = campaigns.filter(
		(campaign) => campaign.cpmBid == campaigns[0]!.cpmBid,
	);

	return validWinners[Math.floor(Math.random() * validWinners.length)]!;
}

function computePrice(campaigns: Campaign[], network: Network): number {
	if (campaigns.length < 2) {
		return network.reservePrice;
	}
	return campaigns[1]!.cpmBid;
}
