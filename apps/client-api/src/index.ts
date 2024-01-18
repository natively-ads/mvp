import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import { Campaign } from '@repo/types';
import { holdSecondPriceCPMAuction } from './auctions/secondPriceCPM';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const port = process.env.CLIENT_API_PORT || 3001;

const app = express();
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
	res.status(200).send('Healthy');
});

// get an ad from a network
app.get('/fetchAd/:networkId', async (req: Request, res: Response) => {
	const networkId = req.params.networkId;
	if (!networkId) {
		res.status(500).send('Missing network id');
	}
	const result = await holdSecondPriceCPMAuction(networkId!, supabase);
	res.status(200).json(result);
});

// post an impression for an ad
app.post(
	'/registerimpression/:impressionId',
	async (req: Request, res: Response) => {
		const impressionId = req.params.impressionId;
		if (!impressionId) {
			res.status(500).send('Missing Impression Id');
		}
		const { data, error } = await supabase
			.from('impressions')
			.update({ adShown: true })
			.eq('impressionId', impressionId);

		console.log(error);
		res.status(201).send(`Success`);
	},
);

app.post(
	'/registerclick/:impressionId',
	async (req: Request, res: Response) => {
		const impressionId = req.params.impressionId;
		if (!impressionId) {
			res.status(500).send('Missing Impression Id');
		}
		const { data, error } = await supabase.from('clicks').insert([
			{
				impressionId: impressionId,
			},
		]);

		console.log(error);
		res.status(201).send(`Success`);
	},
);
app.listen(port, async () => {
	console.log(`Server listening on port ${port}`);
});
