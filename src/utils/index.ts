//
//
//

export const camelCase = (word: string) =>
	word
		.toLowerCase()
		.split(/\s/)
		.map((w, i) =>
			i > 0
				? w.charAt(0).toUpperCase() + w.slice(1)
				: w.charAt(0).toLowerCase() + w.slice(1)
		)
		.join("");
