'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Ad, Network } from '@repo/types';
import { format } from 'date-fns';
import { MoveRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface CampaignFormProps {
	network: Network;
	ads: Ad[];
}

const campaignFormObj = z.object({
	title: z.string().min(2).max(100),
	budget: z.coerce.number().min(0).max(1000000),
	cpmBid: z.coerce.number().min(0).max(1000000),
	startDate: z.date(),
	endDate: z.date(),
});

type CampaignForm = z.infer<typeof campaignFormObj>;

const CampaignFormElement = ({ network, ads }: CampaignFormProps) => {
	const [selectedAdId, setSelectedAdId] = useState<number | undefined>();

	const router = useRouter();

	const campaignForm = useForm<CampaignForm>({
		resolver: zodResolver(campaignFormObj),
		defaultValues: {
			title: '',
			budget: 0,
			cpmBid: 0,
			startDate: new Date(),
			endDate: new Date(),
		},
	});

	const onSubmit = async (data: CampaignForm) => {
		if (selectedAdId == null) {
			return;
		}

		const campaignBody = {
			title: data.title,
			budget: data.budget,
			adId: selectedAdId,
			networkId: network.networkId,
			cpmBid: data.cpmBid,
			advertiserId: '1',
			startDate: data.startDate,
			endDate: data.endDate,
		};

		const response = await fetch('/api/campaigns', {
			method: 'POST',
			body: JSON.stringify(campaignBody),
		});

		if (response.ok) {
			const campaign = await response.json();
			console.log(campaign);
		}

		router.push(`/advertisers/networks/${network.networkId}/campaigns`);
	};

	return (
		<Form {...campaignForm}>
			<form onSubmit={campaignForm.handleSubmit(onSubmit)}>
				<FormField
					control={campaignForm.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Campaign Title</FormLabel>
							<FormControl>
								<Input placeholder="Title" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{ads &&
						ads.map((ad, i) => (
							<Card
								className={`cursor-pointer ${
									selectedAdId === ad.adId
										? 'ring-2 ring-offset-2 ring-indigo-500'
										: ''
								}`}
								key={ad.adId}
								onClick={() => setSelectedAdId(ad.adId)}
							>
								<CardHeader>
									<CardTitle>Ad Option {i + 1}</CardTitle>
								</CardHeader>
								<CardContent>
									<p>{JSON.stringify(ad.content)}</p>
								</CardContent>
							</Card>
						))}
				</div>
				<Link
					className={buttonVariants({ variant: 'outline' })}
					href={'/advertisers/networks/' + network.networkId + '/ads/new'}
				>
					Or Create a New Ad
				</Link>
				<FormField
					control={campaignForm.control}
					name="cpmBid"
					render={({ field }) => (
						<FormItem>
							<FormLabel>CPM Bid</FormLabel>
							<FormControl>
								<Input type="number" placeholder="CPM Bid" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={campaignForm.control}
					name="budget"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Budget</FormLabel>
							<FormControl>
								<Input type="number" placeholder="Budget" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex items-center gap-4">
					<FormField
						control={campaignForm.control}
						name="startDate"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Start Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'w-[240px] pl-3 text-left font-normal',
													!field.value && 'text-muted-foreground',
												)}
											>
												{field.value ? (
													format(field.value, 'PPP')
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date < new Date() || date > new Date('2030-01-01')
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
							</FormItem>
						)}
					/>
					<MoveRightIcon className="mx-5 mt-1.5" />
					<FormField
						control={campaignForm.control}
						name="endDate"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>End Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'w-[240px] pl-3 text-left font-normal',
													!field.value && 'text-muted-foreground',
												)}
											>
												{field.value ? (
													format(field.value, 'PPP')
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												campaignForm.getValues('startDate') == null ||
												campaignForm.getValues('startDate') >= date ||
												date > new Date('2030-01-01')
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
							</FormItem>
						)}
					/>
				</div>
				<Button variant="default" type="submit" disabled={selectedAdId == null}>
					Launch
				</Button>
			</form>
		</Form>
	);
};

export default CampaignFormElement;
