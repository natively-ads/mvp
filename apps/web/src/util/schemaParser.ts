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
export function getValueFromKey(json: Json, key: string): string {
	if (typeof json === 'object' && json !== null && !Array.isArray(json)) {
		return JSON.stringify(json[key]);
	}
	return 'failed to parse';
}
