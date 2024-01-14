import { AdSchema, Json, AdFieldType } from '@repo/types';
export function jsonToAdSchema(json: Json): AdSchema {
	let schema: AdSchema = [];

	if (typeof json === 'object' && json !== null) {
		schema = Object.entries(json).map(([key, value], ind) => {
			return { fieldId: `${ind}`, value: key, type: value as AdFieldType };
		});
	}
	return schema;
}
