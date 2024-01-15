'use client';
import { Campaign } from '@repo/types';
import { useEffect, useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { formatDate } from '@/app/util/dates';
export default function CampaignsPage(): JSX.Element {
	const [campaigns, setCampaigns] = useState<Campaign[]>([]);
	const advertiserId = 1;
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/api/campaigns?advertiserId=1');
			const jsonData = await response.json();
			const campaigns = jsonData as Campaign[];
			setCampaigns(campaigns);
		};

		fetchData();
	}, []);

	return (
		<div>
			<h1 className="text-5xl p-10">My Campaigns</h1>
			<div>
				{campaigns.map((campaign) => {
					return (
						<div
							key={campaign.campaignId}
							className="grid grid-cols-8 m-5 p-5 border-2 rounded-lg"
						>
							<div className="col-span-3">
								<p className="text-3xl">{campaign.title}</p>
								<p>
									{formatDate(campaign.start_date)} -{' '}
									{formatDate(campaign.end_date)}
								</p>
							</div>
							<div className="col-span-1 flex-row text-center ml-10">
								<p className="text-2xl">
									{campaign.budget * 3}
									<span className="text-sm">(${campaign.budget / 4})</span>
								</p>
								<p className="italic">Impressions (CPM)</p>
							</div>
							<div className="col-span-1 flex-row text-center ml-10">
								<p className="text-2xl">
									{Math.round(campaign.budget / 1.5)}
									<span className="text-sm">
										(${Math.round(campaign.budget / 30)})
									</span>
								</p>
								<p className="italic">Clicks (CPC)</p>
							</div>
							<div className="col-span-1 flex-row text-center ml-10">
								<p className="text-2xl">
									{campaign.budget / 2}
									<span className="text-sm">(${campaign.budget})</span>
								</p>
								<p className="italic">Spend (Budget)</p>
							</div>
							<div className="col-span-2 flex flex-row justify-end items-center">
								<Link
									className={buttonVariants({ variant: 'default' })}
									href={`/advertisers/campaigns/${campaign.campaignId}`}
								>
									Manage
								</Link>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
