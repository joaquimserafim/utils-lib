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
