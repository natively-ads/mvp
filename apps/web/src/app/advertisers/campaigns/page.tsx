'use client';
import { buttonVariants } from '@/components/ui/button';
import { formatDate } from '@/util/dates';
import { Campaign, Network } from '@repo/types';
import { set } from 'date-fns';
import Link from 'next/link';
import { useEffect, useState } from 'react';
export default function CampaignsPage(): JSX.Element {
	const [campaigns, setCampaigns] = useState<Campaign[]>([]);
	const [cpms, setCpms] = useState<number[]>([]);
	const [cpcs, setCPCs] = useState<number[]>([]);
	const [ctrs, setCtrs] = useState<number[]>([]);
	const [spends, setSpends] = useState<number[]>([]);
	const [impressions, setImpressions] = useState<number[]>([]);
	const [clicks, setClicks] = useState<number[]>([]);
	const [networkNames, setNetworkNames] = useState<string[]>([]);
	const advertiserId = 1;

	useEffect(() => {
		const fetchData = async () => {
			const campaigns = await fetch(
				`/api/campaigns?advertiserId=${advertiserId}`,
			)
				.then((res) => {
					return res.json();
				})
				.then((data: Campaign[]) => {
					return data;
				});

			const promises = campaigns.map(async (campaign) => {
				const clicks = await fetch(
					`/api/analytics/clicks?campaignId=${campaign.campaignId}`,
				)
					.then((res) => {
						return res.json();
					})
					.then((data: number) => {
						return data;
					});

				const impressions = await fetch(
					`/api/analytics/impressions?campaignId=${campaign.campaignId}`,
				)
					.then((res) => {
						return res.json();
					})
					.then((data: number) => {
						return data;
					});

				const spend = await fetch(
					`/api/analytics/spend?campaignId=${campaign.campaignId}`,
				)
					.then((res) => {
						return res.json();
					})
					.then((data: number) => {
						return Math.round(100 * data) / 100;
					});

				const ctr = await fetch(
					`/api/analytics/ctr?campaignId=${campaign.campaignId}`,
				)
					.then((res) => {
						return res.json();
					})
					.then((data: number) => {
						return Math.round(100 * data) / 100;
					});

				const cpm = await fetch(
					`/api/analytics/cpm?campaignId=${campaign.campaignId}`,
				)
					.then((res) => {
						return res.json();
					})
					.then((data: number) => {
						return Math.round(100 * data) / 100;
					});

				const cpc = await fetch(
					`/api/analytics/cpc?campaignId=${campaign.campaignId}`,
				)
					.then((res) => {
						return res.json();
					})
					.then((data: number) => {
						return Math.round(100 * data) / 100;
					});

				const networkName = await fetch(`/api/networks?networkId=2`)
					.then((res) => {
						return res.json();
					})
					.then((data) => {
						const networks: Network[] = data.data;
						if (!networks || networks.length === 0) {
							return 'Fail';
						}

						return networks[0]!.name!;
					});

				return {
					campaign: campaign,
					clicks: clicks,
					impressions: impressions,
					spend: spend,
					ctr: ctr,
					cpm: cpm,
					cpc: cpc,
					networkName: networkName,
				};
			});
			return await Promise.all(promises);
		};

		fetchData().then((data) => {
			const campaigns = data.map((campaign) => {
				return campaign.campaign;
			});
			const clicks = data.map((campaign) => {
				return campaign.clicks;
			});
			const impressions = data.map((campaign) => {
				return campaign.impressions;
			});
			const spends = data.map((campaign) => {
				return campaign.spend;
			});
			const ctrs = data.map((campaign) => {
				return campaign.ctr;
			});
			const cpms = data.map((campaign) => {
				return campaign.cpm;
			});
			const cpcs = data.map((campaign) => {
				return campaign.cpc;
			});
			const networkNames = data.map((campaign) => {
				return campaign.networkName;
			});

			setCampaigns(campaigns);
			setClicks(clicks);
			setImpressions(impressions);
			setSpends(spends);
			setCtrs(ctrs);
			setCpms(cpms);
			setCPCs(cpcs);
			setNetworkNames(networkNames);
		});
	}, []);

	return (
		<div>
			<h1 className="text-5xl p-10">My Campaigns</h1>
			<div>
				{campaigns.map((campaign, ind) => {
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
								<p>{networkNames ? networkNames[ind] : 'Fail'}</p>
							</div>
							<div className="col-span-1 flex-row text-center ml-10">
								<p className="text-2xl">
									{impressions ? impressions[ind] : 'Fail'}
									<span className="text-sm">
										(${cpms ? cpms[ind] : 'Fail'})
									</span>
								</p>
								<p className="italic">Impressions (CPM)</p>
							</div>
							<div className="col-span-1 flex-row text-center ml-10">
								<p className="text-2xl">
									{clicks ? clicks[ind] : 'Fail'}
									<span className="text-sm">
										(${cpcs ? cpcs[ind] : 'Fail'})
									</span>
								</p>
								<p className="italic">Clicks (CPC)</p>
							</div>
							<div className="col-span-1 flex-row text-center ml-10">
								<p className="text-2xl">
									{spends ? spends[ind] : 'Fail'}
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
