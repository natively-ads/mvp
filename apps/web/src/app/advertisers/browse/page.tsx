'use client';
import { Network } from '@repo/types';
import { useEffect, useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
export default function BrowsePage(): JSX.Element {
	const [networks, setNetworks] = useState<Network[]>([]);
	const [cpms, setCpms] = useState<number[]>([]);
	const [cpcs, setCPCs] = useState<number[]>([]);
	const [ctrs, setCtrs] = useState<number[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const networks = await fetch(`/api/networks`)
				.then((res) => {
					return res.json();
				})
				.then((data: { data: Network[] }) => {
					return data.data;
				});

			const promises = networks.map(async (network) => {
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
				const [ctr, cpm, cpc] = await Promise.all([ctrProm, cpmProm, cpcProm]);
				return {
					network: network,
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
			setCtrs(ctrs);
			setCpms(cpms);
			setCPCs(cpcs);
		});
	}, []);

	return (
		<div>
			<h1 className="text-5xl p-10">Browse All Networks</h1>
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
								<p className="text-2xl">${ctrs[ind]}</p>
								<p className="italic">Average Click Through Rate</p>
							</div>
							<div className="col-span-1 flex-row text-center ml-10">
								<p className="text-2xl">${cpms[ind]}</p>
								<p className="italic">Average CPM</p>
							</div>
							<div className="col-span-1 flex-row text-center ml-10">
								<p className="text-2xl">${cpcs[ind]}</p>
								<p className="italic">Average CPC</p>
							</div>
							<div className="col-span-2 flex flex-row justify-end items-center">
								<Link
									className={buttonVariants({ variant: 'default' })}
									href={
										'/advertisers/networks/' +
										network.networkId +
										'/campaign/new'
									}
								>
									Create Campaign
								</Link>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
