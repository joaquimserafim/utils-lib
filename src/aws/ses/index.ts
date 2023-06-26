import { SendEmailCommand } from "@aws-sdk/client-ses";

import { client } from "./client";

//
//
//

export const send = async (
	from: string,
	to: string | Array<string>,
	subject: string,
	message: string
) => {
	const response = await client.send(
		new SendEmailCommand({
			Destination: {
				ToAddresses: Array.isArray(to) ? [...to] : [to],
			},
			Source: from,
			Message: {
				Subject: {
					Charset: "UTF-8",
					Data: subject,
				},
				Body: {
					Html: {
						Charset: "UTF-8",
						Data: message,
					},
				},
			},
		})
	);

	return response.MessageId;
};
