import {
	ReceiveMessageCommand,
	SendMessageCommand,
	SendMessageCommandInput,
} from "@aws-sdk/client-sqs";

import { client } from "./client";

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

		DelaySeconds: delaySeconds || 0,
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

//
//
//

interface Event<T> {
	readonly type: string;
	readonly timestamp: number;
	readonly event: T;
}

export const pubEvent = async <T>(
	url: string,
	awsOriginRequestId: string,
	event: Event<T>
) => await publish(url, awsOriginRequestId)({ ...event });

//
//
//

export interface SubscriberParams {
	readonly attributeNames?: Array<string>;
	readonly maxNumberOfMessages?: number;
	readonly messageAttributeNames?: Array<string>;
	readonly visibilityTimeout?: number;
	readonly waitTimeSeconds?: number;
}

export const subEvent = async (url: string, params?: SubscriberParams) =>
	await client.send(
		new ReceiveMessageCommand({
			QueueUrl: url,
			AttributeNames: params?.attributeNames || ["ALL"],
			MaxNumberOfMessages: params?.maxNumberOfMessages || 10,
			MessageAttributeNames: params?.messageAttributeNames || ["ALL"],
			VisibilityTimeout: params?.visibilityTimeout || 20,
			WaitTimeSeconds: params?.waitTimeSeconds || 0,
		})
	);
