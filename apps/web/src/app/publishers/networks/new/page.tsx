import NetworkAdBuilder from './networkAdBuilder';

type AdFieldType =
	| 'text'
	| 'number'
	| 'date'
	| 'boolean'
	| 'select'
	| 'multi-select'
	| 'radio'
	| 'checkbox';

interface AdField {
	keyword: string;
	required?: boolean;
	type: AdFieldType;
}

function CreateNetworkPage() {
	return (
		<div>
			<div>Create a new Network</div>
			<NetworkAdBuilder />
		</div>
	);
}

export default CreateNetworkPage;
