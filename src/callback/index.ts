//
//
//

interface Callback {
	readonly body: string;
	readonly statusCode: number;
	readonly headers?: Record<string, string>;
}

export const callback = <T>(
	statusCode: number | string,
	body?: T | "",
	headers?: Record<string, string>
): Callback => ({
	body: body ? (typeof body !== "string" ? JSON.stringify(body) : body) : "",
	statusCode: +statusCode || 500,
	headers,
});
