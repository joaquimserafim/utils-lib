//
//
//

import { S3Client } from "@aws-sdk/client-s3";

export const client = new S3Client({ region: process.env.AWS_REGION });
