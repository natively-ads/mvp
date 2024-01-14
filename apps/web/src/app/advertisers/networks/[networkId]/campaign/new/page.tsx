'use client';
// page to create a new campaign for a given network
import { useState, useEffect } from 'react';
import { Network, Campaign, Ad } from '@repo/types';
import { Input } from '@/components/ui/input';
import { AdPicker } from './adpicker';
const Page = ({ params }: { params: { networkId: string } }) => {
	const [network, setNetwork] = useState<Network | undefined>();
	const [campaignTitle, setCampaignTitle] = useState('');
	const [campaignBudget, setCampaignBudget] = useState<string | undefined>();
	const [cpmBid, setBid] = useState<string | undefined>();
	const [ad, setAd] = useState<Ad | undefined>();
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`/api/networks?networkId=${params.networkId}`,
			);
			const jsonData = await response.json();
			const networks = jsonData.data! as Network[];
			if (networks[0]) {
				setNetwork(networks[0]);
				setBid(`${networks[0]?.reservePrice * 1.05}`);
			}
		};

		fetchData();
	}, []);
	return (
		<div>
			{network && (
				<div className="p-12">
					<p className="text-4xl text-center">Create a New Campaign</p>
					<p className="text-3xl mt-5 underline underline-offset-8">
						{network.name}
					</p>
					<p className="text-me mt-5 italic">{network.description}</p>
					<div className="flex  mt-5 align-cent">
						<p className="text-lg lh-2.5rem">
							Campaign Title (Only you see this):
						</p>
						<Input
							value={campaignTitle}
							onChange={(e) => setCampaignTitle(e.target.value)}
							className="w-80 ml-10"
						/>
					</div>
					<p className="text-2xl mt-5">Ad</p>
					<AdPicker
						network={network}
						chosenAd={ad}
						setAd={setAd}
						advertiserId={'1'}
					/>
					<p className="text-2xl mt-5">Budgets and Bidding</p>
					<div className="flex  mt-5 align-cent">
						<p className="text-lg lh-2.5rem">Total Budget ($):</p>
						<Input
							value={campaignTitle}
							onChange={(e) => setCampaignBudget(e.target.value)}
							className="w-80 ml-10"
						/>
					</div>
					<div className="flex  mt-5 align-cent">
						<p className="text-lg lh-2.5rem">
							Maximum Price For 1000 Impressions ($) :
						</p>
						<Input
							value={cpmBid}
							onChange={(e) => setBid(e.target.value)}
							className="w-80 ml-10"
						/>
					</div>
					<p className="text-sm mt-2">
						We'll make sure you never spend more than the above amounts
					</p>
				</div>
			)}
		</div>
	);
};

export default Page;
