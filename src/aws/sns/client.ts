//
//
//

import { SNSClient } from "@aws-sdk/client-sns";

export const client = new SNSClient({ region: process.env.AWS_REGION });
