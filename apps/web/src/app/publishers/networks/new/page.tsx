'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@radix-ui/react-select';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const adFieldTypes = ['integer', 'number', 'string', 'boolean'] as const;
type AdFieldType = (typeof adFieldTypes)[number];

interface AdFieldsState {
	[key: string]: z.infer<typeof adField>;
}

const adField = z.object({
	keyword: z
		.string()
		.regex(/^[a-zA-Z0-9]+$/)
		.min(3)
		.max(20),
	type: z.enum(adFieldTypes),
	required: z.boolean().optional(),
});

const networkFormObj = z.object({
	name: z.string().min(2).max(100),
	description: z.string().min(2).max(1000),
	reservePrice: z.number().min(0).max(1000000),
});

const PUBLISHER_ID_TEST = '1';

type NetworkForm = z.infer<typeof networkFormObj>;
type AdField = z.infer<typeof adField>;

interface JsonSchema {
	type: string;
	properties: {
		[key: string]: {
			type: string;
		};
	};
	required: string[];
}

const adFieldsToJsonSchema = (adFields: AdField[]): JsonSchema => {
	let schema: JsonSchema = {
		type: 'object',
		properties: {},
		required: [],
	};

	for (const adField of adFields) {
		schema.properties[adField.keyword] = { type: adField.type };
		if (adField.required) {
			schema.required.push(adField.keyword);
		}
	}
	return schema;
};

function CreateNetworkPage() {
	const [adFields, setAdFields] = useState<AdFieldsState>({});

	const adForm = useForm<AdField>({
		resolver: zodResolver(adField),
		defaultValues: {
			keyword: '',
			type: 'string',
			required: false,
		},
	});

	const networkForm = useForm<NetworkForm>({
		resolver: zodResolver(networkFormObj),
		defaultValues: {
			name: '',
			description: '',
			reservePrice: 0,
		},
	});

	const onAdFormSubmit = (values: AdField) => {
		addAdField(values.keyword, values.type, values.required);
		adForm.reset();
	};

	const onNetworkFormSubmit = async () => {
		const schema = adFieldsToJsonSchema(Object.values(adFields));
		const networkFormValues = networkForm.getValues();

		await fetch('/api/networks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				publisherId: PUBLISHER_ID_TEST,
				name: networkFormValues.name,
				description: networkFormValues.description,
				reservePrice: networkFormValues.reservePrice,
				adFormat: schema,
			}),
		});
	};

	const addAdField = (
		keyword: string,
		type: AdFieldType,
		required?: boolean,
	) => {
		if (keyword in adFields) {
			return;
		}
		setAdFields((prevAdFields) => {
			const newAdFields = { ...prevAdFields };
			newAdFields[keyword] = { keyword, type, required: required || false };
			return newAdFields;
		});
	};

	const removeAdField = (keyword: string) => {
		setAdFields((prevAdFields) => {
			const newAdFields = { ...prevAdFields };
			delete newAdFields[keyword];
			return newAdFields;
		});
	};

	return (
		<div className="flex flex-col gap-8 h-screen">
			<div className="">
				<div className="text-lg font-semibold">Step 1: General Settings</div>
				<div className="flex justify-center">
					<Form {...networkForm}>
						<form className="space-y-4 w-1/3">
							<FormField
								control={networkForm.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={networkForm.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Input placeholder="description" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={networkForm.control}
								name="reservePrice"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Reserve Price</FormLabel>
										<FormControl>
											<Input placeholder="reservePrice" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</div>
			</div>
			<Separator />
			<div>
				<div className="text-lg font-semibold">Step 2: Ad Fields</div>
				<div className="flex items-start justify-center gap-8">
					<div className="w-1/3">
						<Table>
							<TableCaption>Current Fields in the network</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead>Keyword</TableHead>
									<TableHead>Type</TableHead>
									<TableHead>Required</TableHead>
									<TableHead></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{Object.values(adFields).map((adField) => {
									return (
										<TableRow>
											<TableHead>{adField.keyword}</TableHead>
											<TableHead>{adField.type}</TableHead>
											<TableHead>
												{adField.required ? 'true' : 'false'}
											</TableHead>
											<TableHead>
												<Button
													variant="destructive"
													onClick={() => removeAdField(adField.keyword)}
												>
													Remove
												</Button>
											</TableHead>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</div>
					<div className="w-1/3">
						<Form {...adForm}>
							<form
								onSubmit={adForm.handleSubmit(onAdFormSubmit)}
								className="space-y-4"
							>
								<FormField
									control={adForm.control}
									name="keyword"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Keyword</FormLabel>
											<FormControl>
												<Input placeholder="keyword" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={adForm.control}
									name="type"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Field Type</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select a field type" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{adFieldTypes.map((type) => (
														<SelectItem value={type}>{type}</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={adForm.control}
									name="required"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Required</FormLabel>
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<Button variant={'secondary'} type="submit">
									Add Field
								</Button>
							</form>
						</Form>
					</div>
				</div>
			</div>

			<div className="flex justify-center">
				<Button variant={'default'} onClick={onNetworkFormSubmit}>
					Create!
				</Button>
			</div>
		</div>
	);
}

export default CreateNetworkPage;
