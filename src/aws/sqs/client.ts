//
//
//

import { SQSClient } from "@aws-sdk/client-sqs";

export const client = new SQSClient({ region: process.env.AWS_REGION });
