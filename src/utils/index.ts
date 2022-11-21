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
			[camelCase(curr)]: R.is(Object, o[curr])
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
	o: Record<string, unknown>
): T =>
	Object.keys(o).reduce(
		(acc, curr) => ({
			...acc,
			[camelToSnake(curr)]: R.is(Object, o[curr])
				? recCamelCaseToSnakeCase(<Record<string, unknown>>o[curr])
				: o[curr],
		}),
		<T>{}
	);
