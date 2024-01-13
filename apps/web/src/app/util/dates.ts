export function formatDate(dateString: string): string {
	const date = new Date(dateString);

	let month = (date.getMonth() + 1).toString();
	let day = date.getDate().toString();
	let year = date.getFullYear().toString().substr(-2);

	// Adding leading zeros if month or day is a single digit
	month = month.length < 2 ? '0' + month : month;
	day = day.length < 2 ? '0' + day : day;

	return `${month}/${day}/${year}`;
}
