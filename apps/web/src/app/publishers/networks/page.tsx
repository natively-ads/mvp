'use client';
import { Network } from '@repo/types';
import { useEffect, useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
const Page = () => {
	const [networks, setNetworks] = useState<Network[]>([]);
	const publisherId = 2;
	const [cpms, setCpms] = useState<number[]>([]);
	const [cpcs, setCPCs] = useState<number[]>([]);
	const [ctrs, setCtrs] = useState<number[]>([]);
	const [spends, setSpends] = useState<number[]>([]);
	const [impressions, setImpressions] = useState<number[]>([]);
	const [clicks, setClicks] = useState<number[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const networks = await fetch(`/api/networks?publisherid=${publisherId}`)
				.then((res) => {
					return res.json();
				})
				.then((data: { data: Network[] }) => {
					return data.data;
				});

			const promises = networks.map(async (network) => {
				const clicksProm = fetch(
					`/api/analytics/clicks?networkId=${network.networkId}`,
				)
					.then((res) => {
						return res.json();
					})
					.then((data: number) => {
						return data;
					});

				const impressionsProm = fetch(
					`/api/analytics/impressions?networkId=${network.networkId}`,
				)
					.then((res) => {
						return res.json();
					})
					.then((data: number) => {
						return data;
					});

				const spendProm = fetch(
					`/api/analytics/spend?networkId=${network.networkId}`,
				)
					.then((res) => {
						return res.json();
					})
					.then((data: number) => {
						return Math.round(100 * data) / 100;
					});

				const ctrProm = fetch(
					`/api/analytics/ctr?networkId=${network.networkId}`,
				)
					.then((res) => {
						return res.json();
					})
					.then((data: number) => {
						return Math.round(100 * data) / 100;
					});

				const cpmProm = fetch(
					`/api/analytics/cpm?networkId=${network.networkId}`,
				)
					.then((res) => {
						return res.json();
					})
					.then((data: number) => {
						return Math.round(100 * data) / 100;
					});

				const cpcProm = fetch(
					`/api/analytics/cpc?networkId=${network.networkId}`,
				)
					.then((res) => {
						return res.json();
					})
					.then((data: number) => {
						return Math.round(100 * data) / 100;
					});
				const [clicks, impressions, spend, ctr, cpm, cpc] = await Promise.all([
					clicksProm,
					impressionsProm,
					spendProm,
					ctrProm,
					cpmProm,
					cpcProm,
				]);
				return {
					network: network,
					clicks: clicks,
					impressions: impressions,
					spend: spend,
					ctr: ctr,
					cpm: cpm,
					cpc: cpc,
				};
			});
			return await Promise.all(promises);
		};

		fetchData().then((data) => {
			const networks = data.map((network) => {
				return network.network;
			});
			const clicks = data.map((network) => {
				return network.clicks;
			});
			const impressions = data.map((network) => {
				return network.impressions;
			});
			const spends = data.map((network) => {
				return network.spend;
			});
			const ctrs = data.map((network) => {
				return network.ctr;
			});
			const cpms = data.map((network) => {
				return network.cpm;
			});
			const cpcs = data.map((network) => {
				return network.cpc;
			});

			setNetworks(networks);
			setClicks(clicks);
			setImpressions(impressions);
			setSpends(spends);
			setCtrs(ctrs);
			setCpms(cpms);
			setCPCs(cpcs);
		});
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`/api/networks?publisherid=${publisherId}`);
			const jsonData = await response.json();
			const networks = jsonData.data! as Network[];
			setNetworks(networks);
		};

		fetchData();
	}, []);

	return (
		<div>
			<h1 className="text-5xl p-10">My Networks</h1>
			<div>
				{networks.map((network, ind) => {
					return (
						<div
							key={network.networkId}
							className="grid grid-cols-8 m-5 p-5 border-2 rounded-lg"
						>
							<div className="col-span-3">
								<p className="text-3xl">{network.name}</p>
								<p>{network.description}</p>
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
								<p className="text-2xl">{spends ? spends[ind] : 'Fail'}</p>
								<p className="italic">Total Revenue</p>
							</div>
							<div className="col-span-2 flex flex-row justify-end items-center">
								<Link
									className={buttonVariants({ variant: 'default' })}
									href={''}
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
};

export default Page;
