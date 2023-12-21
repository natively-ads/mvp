// Displays basic information about a specific network. Contains button to go to campaign creation page

const Page = ({ params }: { params: { networkId: string } }) => {
  return <div>Page networkId: {params.networkId} </div>;
};

export default Page;
