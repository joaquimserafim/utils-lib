//
// unfortunally JS is getting a bit chaotic again ...
// declaring this before importing the aws sdk v3
//

declare global {
	//eslint-disable-next-line
	interface ReadableStream {}
	//eslint-disable-next-line
	interface File {}
}

import { log } from "../../log/index";

const logger = log("dynamodb/client")({});

//
//
//

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const client = new DynamoDBClient({
	region: process.env.AWS_REGION,
	logger: {
		info: logger.info,
		warn: logger.info,
		debug: logger.info,
		error: logger.error,
	},
});
