import { client } from "./client";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

//
//
//

export const put = async <T = string>(
	bucket: string,
	key: string,
	message: T
) =>
	await client.send(
		new PutObjectCommand({
			Bucket: bucket,
			Key: key,
			Body:
				typeof message === "string" ? message : JSON.stringify(message),
		})
	);

//
//
//

export const get = async (bucket: string, key: string) => {
	const response = await client.send(
		new GetObjectCommand({
			Bucket: bucket,
			Key: key,
		})
	);

	const payload = await response.Body?.transformToString();

	return payload || null;
};
