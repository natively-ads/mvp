// page to create a new campaign for a given network
import { Ad, Network } from '@repo/types';
import CampaignForm from './campaignForm';

const ADVERTISER_ID = 1;

const Page = async ({ params }: { params: { networkId: string } }) => {
	const networkRequest: Promise<Network | undefined> = fetch(
		`http://localhost:3000/api/networks?networkId=${params.networkId}`,
	)
		.then((res) => res.json())
		.then((data: { data: Network[] }) =>
			data.data.length > 0 ? data.data[0] : undefined,
		);

	const adRequest: Promise<Ad[]> = fetch(
		`http://localhost:3000/api/ads?advertiserId=${ADVERTISER_ID}&networkId=${params.networkId}`,
	)
		.then((res) => res.json())
		.then((data: Ad[]) => data);

	const [network, ads] = await Promise.all([networkRequest, adRequest]);

	if (network == null) {
		// ERROR
		throw new Error('Network not found');
	}

	return (
		<div className="p-12">
			<p className="text-4xl text-center">Create a New Campaign</p>
			<p className="text-3xl mt-5 underline underline-offset-8">
				{network.name}
			</p>
			<p className="text-me mt-5 italic">{network.description}</p>
			<CampaignForm network={network} ads={ads} />
		</div>
	);
};

export default Page;
