const NetworkPage = async ({ params }: { params: { networkId: string } }) => {
	// just shows how to integrate with the API

	const apiDetails = [
		{
			name: 'Get Ad',
			endpoint: `https://api.gruvian.com/fetchAd/${params.networkId}`,
			method: 'GET',
			description: 'Get an ad to serve on your network',
			returns: 'An ad object with an impressionId',
		},
		{
			name: 'Register Impression',
			endpoint: 'https://api.gruvian.com/registerimpression/impressionId',
			method: 'POST',
			description: 'Register that an impression occured with an impressionId',
		},
		{
			name: 'Register Click',
			endpoint: 'https://api.gruvian.com/registerclick/impressionId',
			method: 'POST',
			description: 'Register that a click occured with an impressionId',
		},
	];

	const APICard = ({ api }: { api: any }) => (
		<div className="bg-white shadow-md rounded-lg p-4 mb-6">
			<h2 className="text-lg font-semibold text-gray-800">{api.name}</h2>
			<p className="text-sm text-gray-600">
				<strong>Endpoint:</strong> {api.endpoint}
			</p>
			<p className="text-sm text-gray-600">
				<strong>Method:</strong> {api.method}
			</p>
			<p className="text-sm text-gray-600">
				<strong>Description:</strong> {api.description}
			</p>
			{api.returns && (
				<p className="text-sm text-gray-600">
					<strong>Returns:</strong> {api.returns}
				</p>
			)}
		</div>
	);

	return (
		<div className="container mx-auto p-4">
			<p className="text-xl font-semibold mb-4">
				How to integrate your network:
			</p>
			<div>
				{apiDetails.map((api, index) => (
					<APICard key={index} api={api} />
				))}
			</div>
		</div>
	);
};

export default NetworkPage;
