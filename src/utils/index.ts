import * as R from "ramda";

//
//
//

export const camelCase = (str: string) =>
	str
		.replace(/_|-/g, " ")
		.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
			+match === 0
				? ""
				: index === 0
				? match.toLowerCase()
				: match.toUpperCase()
		);

//
// converts recursive the keys of a given object with nested objects
// doesn't iteract over arrays
//

export const recCamelCase = <T = unknown>(o: Record<string, unknown>): T =>
	Object.keys(o).reduce(
		(acc, curr) => ({
			...acc,
			[camelCase(curr)]: Array.isArray(o[curr])
				? (o[curr] as Array<Record<string, unknown>>).map(recCamelCase)
				: R.is(Object, o[curr])
				? recCamelCase(<Record<string, unknown>>o[curr])
				: o[curr],
		}),
		<T>{}
	);
//
// camelCase to snakeCase
//

export const camelToSnake = (word: string) =>
	word.replace(/([A-Z])/g, (x) => R.concat("_", x.toLowerCase()));

//
// camelCase to snakeCase, object(s)
//

export const recCamelCaseToSnakeCase = <T = unknown>(
	o: Record<string, T> | Array<T>
): T | Array<T> =>
	!Array.isArray(o)
		? Object.keys(o).reduce(
				(acc, curr) => ({
					...acc,
					[camelToSnake(curr)]: R.is(Object, o[curr])
						? recCamelCaseToSnakeCase(
								<Record<string, unknown>>o[curr]
						  )
						: o[curr],
				}),
				<T>{}
		  )
		: o;

//
//
//

export const getTimeMs = (endTime: number[]): number =>
	+Number(endTime[0] * 1e3 + endTime[1] * 1e-6).toFixed(1);

//
//
//

export const betweenRange = (value: number, n1: number, n2: number) =>
	n1 <= value && n2 >= value;

//
//
//

export const hash = (str: string) => {
	let hash = 5381;
	let index = str.length;

	while (index) {
		hash = (hash * 33) ^ str.charCodeAt(--index);
	}

	return hash >>> 0;
};

//
// string metric to measure the distances between two sequences
//

export const levenshteinDistance = (str1: string, str2: string) => {
	const len1 = str1.length;
	const len2 = str2.length;

	if (len1 === 0) return len2;
	if (len2 === 0) return len1;

	const matrix = [];

	for (let i = 0; i <= len1; i++) {
		matrix[i] = [i];
	}

	for (let j = 0; j <= len2; j++) {
		matrix[0][j] = j;
	}

	for (let i = 1; i <= len1; i++) {
		for (let j = 1; j <= len2; j++) {
			const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;

			matrix[i][j] = Math.min(
				matrix[i - 1][j] + 1, // deletion
				matrix[i][j - 1] + 1, // insertion
				matrix[i - 1][j - 1] + cost // substitution
			);
		}
	}

	return matrix[len1][len2];
};
