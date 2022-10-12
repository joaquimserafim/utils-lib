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
