import fetch from "node-fetch";
import AbortController from "abort-controller";
import { strict as assert } from "assert";

import { LogProps } from "../log/index";

//
//
//

export enum HttpMethod {
	GET = "GET",
	POST = "POST",
}

export interface RequestOptions<R> {
	readonly path?: string;
	readonly method?: HttpMethod;
	readonly body?: R;
	readonly timeout?: number;
	readonly headers?: Record<string, string>;
	readonly slogger?: LogProps;
}

export const request = async <T = unknown, R = unknown>(
	url: string,
	{
		path,
		method,
		body,
		headers,
		timeout = 5000,
		slogger,
	}: RequestOptions<R> = {}
): Promise<T | undefined> => {
	const controller = new AbortController();

	const timeoutId = setTimeout(() => controller.abort(), timeout);

	try {
		const response = await fetch(`${url}${path ?? ""}`, {
			method,
			body: body && JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
				...headers,
			},
			signal: controller.signal,
		});

		const payload = await response.text();
		const status = response.status;

		slogger?.info({
			origin: "request",
			headers: response.headers.raw(),
			status,
			payload,
		});

		assert(response.ok, payload || "" + (status === 500 ? 502 : status));

		return !payload
			? undefined
			: isJson<T>(
					response.headers.get("content-type") as string,
					payload
			  );
	} finally {
		clearTimeout(timeoutId);
	}
};

//
//
//

const isJson = <T = string>(contentType: string, payload: string): T =>
	["application/json", "application/json; charset=utf-8"].indexOf(
		contentType
	) !== -1
		? JSON.parse(payload)
		: payload;
