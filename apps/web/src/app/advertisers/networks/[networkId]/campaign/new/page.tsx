// page to create a new campaign for a given network
const Page = ({ params }: { params: { networkId: string } }) => {
	return <div>Page networkId: {params.networkId}</div>;
};

export default Page;
