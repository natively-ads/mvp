import { RadioGroup, RadioGroupItem } from '@/components/ui/radio';
import { getValueFromKey, jsonToAdSchema } from '@/util/schemaParser';
import { Ad, AdSchema, Network } from '@repo/types';
import { useEffect, useState } from 'react';
type AdPickerProps = {
	network: Network;
	chosenAd: Ad | undefined;
	setAd: (ad: Ad | undefined) => void;
	advertiserId: string;
	className: string;
};

export const AdPicker = (props: AdPickerProps) => {
	const [ads, setAds] = useState<Ad[]>([]);
	const [adSchema, setAdSchema] = useState<AdSchema | undefined>();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`/api/ads?advertiserId=${props.advertiserId}&networkId=${props.network.networkId}`,
			);
			const jsonData = await response.json();
			const ads = jsonData! as Ad[];
			setAds(ads);
		};

		setAdSchema(jsonToAdSchema(props.network.adFormat));
		fetchData();
	}, [props]);

	const updateSelAd = (chosenId: string) => {
		props.setAd(ads.find((ad) => `${ad.adId}` === chosenId));
	};

	return (
		<div className={props.className}>
			<RadioGroup className="flex" onValueChange={updateSelAd}>
				{ads &&
					props.network &&
					ads.map((ad) => {
						return (
							<div
								className={
									'border p-5 mr-5 ' +
									(props.chosenAd?.adId == ad.adId
										? 'border-4 border-lime-600'
										: 'border-1')
								}
								key={ad.adId}
							>
								<RadioGroupItem value={`${ad.adId}`} />
								{ad.content &&
									adSchema &&
									adSchema.map((field) => {
										return (
											<p key={field.fieldId}>
												<b className="mr-5">{field.value.toUpperCase()}:</b>
												{ad.content && getValueFromKey(ad.content, field.value)}
											</p>
										);
									})}
							</div>
						);
					})}
			</RadioGroup>
		</div>
	);
};
