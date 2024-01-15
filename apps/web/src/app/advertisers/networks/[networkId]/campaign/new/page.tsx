'use client';
// page to create a new campaign for a given network
import { useState, useEffect } from 'react';
import { Network, Campaign, Ad } from '@repo/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/DatePicker';
import { MoveRight as MoveRightIcon } from 'lucide-react';
import { AdPicker } from './adpicker';
const Page = ({ params }: { params: { networkId: string } }) => {
	const [network, setNetwork] = useState<Network | undefined>();
	const [campaignTitle, setCampaignTitle] = useState('');
	const [campaignBudget, setCampaignBudget] = useState<string | undefined>();
	const [cpmBid, setBid] = useState<string | undefined>();
	const [ad, setAd] = useState<Ad | undefined>();
	const [startDate, setStartDate] = useState<Date>();
	const [endDate, setEndDate] = useState<Date>();
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`/api/networks?networkId=${params.networkId}`,
			);
			const jsonData = await response.json();
			const networks = jsonData.data! as Network[];
			if (networks[0]) {
				setNetwork(networks[0]);
				setBid(`${Math.round(100 * networks[0]?.reservePrice * 1.05) / 100}`);
				setCampaignBudget(
					`${Math.round(networks[0]?.reservePrice * 1.05 * 8)}`,
				);
			}
		};

		fetchData();
	}, []);

	const createCampaign = async () => {
		if (
			!campaignTitle ||
			!campaignBudget ||
			!cpmBid ||
			!startDate ||
			!endDate ||
			!ad ||
			!network
		) {
			return;
		}

		const campaignBody = {
			title: campaignTitle,
			budget: parseFloat(campaignBudget),
			adId: ad.adId,
			networkId: network.networkId,
			cpmBid: parseFloat(cpmBid),
			advertiserId: '1',
			startDate: startDate,
			endDate: endDate,
		};

		const response = await fetch('/api/campaigns', {
			method: 'POST',
			body: JSON.stringify(campaignBody),
		});

		const jsonData = await response.json();
	};

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
						className="mt-5"
					/>
					<p className="text-2xl mt-5">Budgets and Bidding</p>
					<div className="flex  mt-5 align-cent">
						<p className="text-lg lh-2.5rem">Total Budget ($):</p>
						<Input
							value={campaignBudget}
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
					<p className="text-sm mt-6">
						We'll make sure you never spend more than the above amounts.
					</p>
					<p className="text-2xl mt-5">Schedule Your Campaign</p>
					<div className="flex mt-5 align-center">
						<DatePicker
							date={startDate}
							setDate={setStartDate}
							instructionLabel="Set Start Date"
						/>
						<MoveRightIcon className="mx-5 mt-1.5" />
						<DatePicker
							date={endDate}
							setDate={setEndDate}
							instructionLabel="Set End Date"
						/>
					</div>
					<Button className="mt-5" onClick={createCampaign}>
						Launch Campaign
					</Button>
				</div>
			)}
		</div>
	);
};

export default Page;
