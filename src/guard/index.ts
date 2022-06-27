//
// easy safe guard
//

export const guard = <T = unknown>(
	expression: boolean,
	returnAction: () => T
): unknown => expression && returnAction();
