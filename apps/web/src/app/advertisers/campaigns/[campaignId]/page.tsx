
// Place for advertiser to view information on a specific campaign 

const Page = ({ params }: { params: { campaignId: string } }) => {
  return (
    <div>Page campaignId: {params.campaignId}</div>
  )
}

export default Page