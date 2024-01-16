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
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const adFieldTypes = ['text', 'number', 'date', 'boolean', 'checkbox'] as const;
type AdFieldType = (typeof adFieldTypes)[number];

interface AdField {
	keyword: string;
	required?: boolean;
	type: AdFieldType;
}

interface AdFieldsState {
	[key: string]: AdField;
}

interface CurrentAdFieldProps {
	adField: AdField;
	removeFn: () => void;
}

const formSchema = z.object({
	keyword: z
		.string()
		.regex(/^[a-zA-Z]+$/)
		.min(3)
		.max(20),
	type: z.enum(adFieldTypes),
	required: z.boolean().optional(),
});

function CurrentAdField({ adField, removeFn }: CurrentAdFieldProps) {
	// renders an added ad field
	return (
		<span>
			<div>{adField.keyword}</div>
			<div>{adField.type}</div>
			<div>{adField.required ? 'required' : 'optional'}</div>
			<button onClick={removeFn}>remove</button>
		</span>
	);
}

function NetworkAdBuilder() {
	const [adFields, setAdFields] = useState<AdFieldsState>({});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			keyword: '',
			type: 'text',
			required: false,
		},
	});

	const onFormSubmit = (values: z.infer<typeof formSchema>) => {
		addAdField(values.keyword, values.type, values.required);
		form.reset();
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
		<div>
			<div>
				Current Ad Fields
				{Object.values(adFields).map((adField) => {
					return (
						<CurrentAdField
							adField={adField}
							removeFn={() => removeAdField(adField.keyword)}
						/>
					);
				})}
			</div>
			<div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onFormSubmit)}
						className="space-y-8"
					>
						<FormField
							control={form.control}
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
							control={form.control}
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
							control={form.control}
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
						<Button type="submit">Add Field</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}

export default NetworkAdBuilder;
