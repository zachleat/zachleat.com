export function leftpad(str, length = 3) {
	let padding = Array.from({length}).map(t => "0").join("");
	return (padding + str).slice(-1 * length);
}

/* Date utilities */
const ONE_DAY = 24*60*60*1000;

export function getEndDateFromWeekNumber(year, weekNumber) {
	let startOfYear = new Date(year, 0 , 1);
	let timeDiffMs = (weekNumber + 1) * 7 * ONE_DAY;
	return new Date(startOfYear.getTime() + timeDiffMs - 1);
}

export function getDayOfYear(date) {
	let startOfYear = new Date(date.getFullYear(), 0 , 1);
	return Math.floor((date.getTime() - startOfYear.getTime()) / ONE_DAY);
}

export function getWeekOfYear(date) {
	return Math.floor(getDayOfYear(date) / 7);
}
