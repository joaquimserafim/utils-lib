declare global {
	//eslint-disable-next-line
	interface ReadableStream {}
	//eslint-disable-next-line
	interface File {}
	//eslint-disable-next-line
	interface Blob {}
}

export * as dynamodb from "./dynamodb/index";
export * as misc from "./misc";
export * as sqs from "./sqs/index";
export * as sns from "./sns/index";
export * as s3 from "./s3/index";
