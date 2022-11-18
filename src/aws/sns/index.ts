import { client } from "./client";
import { PublishCommand } from "@aws-sdk/client-sns";

//
//
//

export const sendSMS = async (phoneNumber: string, message: string) =>
	await client.send(
		new PublishCommand({
			PhoneNumber: phoneNumber,
			Message: message,
		})
	);

//
//
//

export const publishToTopic = async <T>(topicArn: string, message: T) =>
	await client.send(
		new PublishCommand({
			TopicArn: topicArn,
			Message:
				typeof message === "string" ? message : JSON.stringify(message),
		})
	);
