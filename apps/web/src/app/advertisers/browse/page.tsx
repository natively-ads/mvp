'use client'
import { Network } from '@repo/types';
import {useEffect, useState} from 'react'
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
export default function BrowsePage(): JSX.Element {

  const [networks, setNetworks] = useState<Network[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/networks');
      const jsonData = await response.json();
      const networks = jsonData.data! as Network[]
      setNetworks(networks)
    };

    fetchData();
  }, [])


	return (
		<div>
			<h1 className = "text-5xl p-10">Browse All Networks</h1>
      <div>
        {networks.map((network) => {
          return <div key = {network.networkId} className = "grid grid-cols-8 m-5 p-5 border-2 rounded-lg">
            <div className = "col-span-3">
            <p className='text-3xl'>{network.name}</p>
            <p>{network.description}</p>
            </div>
            <div className = 'col-span-1 flex-row text-center ml-10'>
            <p className = 'text-2xl'>${network.reservePrice}</p>
            <p className = "italic">Reserve Price</p>
            </div>
            <div className = 'col-span-1 flex-row text-center ml-10'>
            <p className = 'text-2xl'>${network.reservePrice / 2}</p>
            <p className = "italic">Average CPM</p>
            </div>
            <div className = 'col-span-1 flex-row text-center ml-10'>
            <p className = 'text-2xl'>${network.reservePrice / 4}</p>
            <p className = "italic">Average CPC</p>
            </div>
            <div className = "col-span-2 flex flex-row justify-end items-center">
            <Link
					className={buttonVariants({ variant: 'default' })}
					href={''}
				>
					Create Campaign
				</Link>
        </div>
          </div>
        })}
      </div>
		</div>
	);
}
