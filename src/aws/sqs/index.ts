import { sqsClient } from "./client";
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
	userId: string,
	delaySeconds?: number
) => {
	const params: SendMessageCommandInput = {
		MessageAttributes: {
			awsRequestId: {
				DataType: "String",
				StringValue: awsRequestId,
			},
			userId: {
				DataType: "String",
				StringValue: userId,
			},
		},
		QueueUrl: queueUrl,
		DelaySeconds: delaySeconds || 1,
		MessageBody: "",
	};

	return async <T>(msg: T | string) =>
		await sqsClient.send(
			new SendMessageCommand({
				...params,
				MessageBody:
					typeof msg === "string" ? msg : JSON.stringify(msg),
			})
		);
};
