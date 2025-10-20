export function leftpad(str, length = 3) {
	let padding = Array.from({length}).map(t => "0").join("");
	return (padding + str).slice(-1 * length);
}
