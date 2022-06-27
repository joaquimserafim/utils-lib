//
//
//

interface Callback {
	readonly body: string;
	readonly statusCode: number;
}

export const callback = <T>(
	statusCode: number | string,
	body?: T | ""
): Callback => ({
	body: body ? (typeof body !== "string" ? JSON.stringify(body) : body) : "",
	statusCode: +statusCode || 500,
});
