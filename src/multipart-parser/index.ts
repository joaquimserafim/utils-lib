import { strict as assert } from "assert";
import { camelCase } from "../utils";

//
//
//

export enum Encondig {
	utf8 = "utf8",
	base64 = "base64",
}

//
// help funs
//

export const unescape = (str: string) =>
	(str + "===".slice((str.length + 3) % 4))
		.replace(/-/g, "+")
		.replace(/_/g, "/");

export const decode = (str: string, encoding?: Encondig) =>
	Buffer.from(unescape(str), Encondig.base64).toString(
		encoding ?? Encondig.utf8
	);

//
//
//
//

interface ParserOutput {
	readonly [key: string]: string;
}

export const multipartParser = (
	contentType?: string,
	body?: string
): Promise<ParserOutput[]> =>
	new Promise((resolve, reject) => {
		const token = contentType
			?.split(";")[1]
			?.split("------------------------")[1];

		try {
			assert(token, "content-type with bad format");

			const payload = decode(body || "");

			const splitPayload = payload?.split("\r\n")?.filter((e) => !!e);

			const isTokenValid =
				new Set([
					splitPayload[0]?.replace(/-/g, ""),
					splitPayload[splitPayload?.length - 1]?.replace(/-/g, ""),
					token,
				]).size === 1;

			assert(isTokenValid, "form data token does not match");

			const header = splitPayload[3].split(",").map(camelCase);
			const data = splitPayload.slice(4, -1);

			const dataFormated: ParserOutput[] = data.map((entry) => {
				const values = entry.split(",");
				let i = 0;

				return header.reduce((acc, value) => {
					const newObj = {
						...acc,
						[value]: values[i],
					};

					i = i + 1;

					return newObj;
				}, {});
			});

			resolve(dataFormated);
		} catch (error) {
			const { message } = <Error>error;
			reject(message);
		}
	});
