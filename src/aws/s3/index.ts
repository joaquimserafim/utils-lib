import { client } from "./client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

//
//
//

export const save = async <T = string>(
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
