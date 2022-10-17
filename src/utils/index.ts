// import * as R from "ramda";

//
//
//

export const camelCase = (word: string) =>
	word
		.toLowerCase()
		.split(/\s|-|_/g)
		.map((w, i) =>
			i > 0
				? w.charAt(0).toUpperCase() + w.slice(1)
				: w.charAt(0).toLowerCase() + w.slice(1)
		)
		.join("");

//
//
//

// const mapKeys = R.curry((fn, obj) =>
//	R.fromPairs(R.map(R.adjust(0, fn), R.toPairs(obj)))
// );

//
//
//

// export const eCamelCase = R.pipe(
//	R.map(R.when(R.is(Object), (v) => eCamelCase(v))),
//	mapKeys(camelCase)
// );
