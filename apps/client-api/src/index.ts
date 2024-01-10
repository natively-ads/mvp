import express, { Request, Response } from 'express';

const port = process.env.CLIENT_API_PORT || 3001;

const app = express();
app.use(express.json());

// get an ad from a network
app.get('/ad-network/:networkId/ads', (req: Request, res: Response) => {
	const networkId = req.params.networkId;
	const adId = req.query.adId; // if this is undefined, get the highest bidding ad

	res.status(200).send(`Ad ${adId} from network ${networkId} returned`);
});

// post an impression for an ad
app.post(
	'/ad-network/:networkId/impressions',
	(req: Request, res: Response) => {
		const networkId = req.params.networkId;

		// This is what's expected in the request body
		const { adId, timestamp, viewerDetails } = req.body;

		res
			.status(201)
			.send(`Impression for ad ${adId} in network ${networkId} recorded`);
	},
);

// post a click for an ad
app.post('/ad-network/:networkId/clicks', (req: Request, res: Response) => {
	const networkId = req.params.networkId;

	// What's expected in the request body
	const { adId, timestamp, clickDetails } = req.body;

	res.status(201).send(`Click for ad ${adId} in network ${networkId} recorded`);
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
