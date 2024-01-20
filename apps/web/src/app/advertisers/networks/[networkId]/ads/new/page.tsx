import { Network } from '@repo/types';
import CreateAdForm from './createAdForm';

const CreateAdPage = async ({ params }: { params: { networkId: string } }) => {
	const networkRequest: Promise<Network | undefined> = fetch(
		`http://localhost:3000/api/networks?networkId=${params.networkId}`,
	)
		.then((res) => res.json())
		.then((data: { data: Network[] }) =>
			data.data.length > 0 ? data.data[0] : undefined,
		);

	const network = await networkRequest;

	if (network == null) {
		return <div>Network not found</div>;
	}

	return (
		<div>
			<CreateAdForm
				networkId={network.networkId}
				networkName={network.name}
				adFormat={network.adFormat}
			/>
		</div>
	);
};

export default CreateAdPage;
