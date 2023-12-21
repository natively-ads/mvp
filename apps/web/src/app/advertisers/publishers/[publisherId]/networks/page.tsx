// this is a page where advertisers can view a list of networks that a publisher has created

const Page = ({ params }: { params: { publisherId: string } }) => {
  return <div>Page publisherId: {params.publisherId}</div>;
};

export default Page;
