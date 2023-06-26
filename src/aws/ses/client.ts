//
//
//

import { SESClient } from "@aws-sdk/client-ses";

export const client = new SESClient({ region: process.env.AWS_REGION });
