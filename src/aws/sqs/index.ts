import { client } from "./client";
import {
	SendMessageCommand,
	SendMessageCommandInput,
} from "@aws-sdk/client-sqs";

//
//
//

export const publish = (
	queueUrl: string,
	awsRequestId: string,
	delaySeconds?: number
) => {
	const params: SendMessageCommandInput = {
		MessageAttributes: {
			awsRequestId: {
				DataType: "String",
				StringValue: awsRequestId,
			},
		},
		QueueUrl: queueUrl,
		DelaySeconds: delaySeconds || 1,
		MessageBody: "",
	};

	return async <T>(msg: T | string) =>
		await client.send(
			new SendMessageCommand({
				...params,
				MessageBody:
					typeof msg === "string" ? msg : JSON.stringify(msg),
			})
		);
};
