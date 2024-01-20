'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';

interface CreateAdFormProps {
	networkId: number;
	networkName: string | null;
	adFormat: any;
}

interface IFormData {
	[key: string]: any;
}

const CreateAdForm = ({
	networkId,
	networkName,
	adFormat,
}: CreateAdFormProps) => {
	const [formData, setFormData] = useState<IFormData>({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const initialFormData: any = {};
		Object.keys(adFormat?.properties || {}).forEach((key) => {
			const type = adFormat.properties[key].type;
			initialFormData[key] = type === 'boolean' ? false : '';
		});
		setFormData(initialFormData);
	}, [adFormat]);

	const handleChange = (e: any) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		const advertiserId = 1;

		await fetch('/api/ads', {
			method: 'POST',
			body: JSON.stringify({
				networkId,
				advertiserId,
				content: formData,
			}),
		});
		setLoading(false);
	};

	const renderFormFields = () => {
		const fields = adFormat?.properties || {};
		return Object.keys(fields).map((key) => {
			const type = fields[key].type;
			switch (type) {
				case 'integer':
				case 'number':
					return (
						<div key={key}>
							<Label htmlFor={key}>{key}</Label>
							<Input
								type="number"
								name={key}
								value={formData[key]}
								onChange={handleChange}
							/>
						</div>
					);
				case 'boolean':
					return (
						<div key={key}>
							<Label htmlFor={key}>{key}</Label>
							<Input
								type="checkbox"
								name={key}
								checked={formData[key]}
								onChange={handleChange}
							/>
						</div>
					);
				case 'string':
				default:
					return (
						<div key={key}>
							<Label htmlFor={key}>{key}</Label>
							<Input
								type="text"
								name={key}
								value={formData[key]}
								onChange={handleChange}
							/>
						</div>
					);
			}
		});
	};
	return (
		<div>
			<div>Create an Ad</div>
			<div>Network: {networkName}</div>
			<form onSubmit={handleSubmit}>
				{renderFormFields()}
				<Button type="submit" disabled={loading}>
					Create
				</Button>
			</form>
			{JSON.stringify(formData)}
		</div>
	);
};

export default CreateAdForm;
