export type AdFieldType = 'string' | 'number' | 'boolean';

export interface AdField<T> {
	fieldId: string;
	type: AdFieldType;
	value: T;
}

export type AdSchema = AdField<any>[];
