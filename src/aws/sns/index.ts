import { PublishCommand } from "@aws-sdk/client-sns";

import { client } from "./client";

//
//
//

export const sendSms = async (phoneNumber: string, message: string) =>
	await client.send(
		new PublishCommand({
			PhoneNumber: phoneNumber,
			Message: message,
		})
	);

//
//
//

export const publishToTopic = async <T>(
	topicArn: string,
	subject: string,
	message: T
) =>
	await client.send(
		new PublishCommand({
			TopicArn: topicArn,
			Subject: subject,
			Message:
				typeof message === "string" ? message : JSON.stringify(message),
		})
	);
