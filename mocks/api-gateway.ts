import { Context, APIGatewayProxyEventV2 } from "aws-lambda";

export const context: Context = {
	callbackWaitsForEmptyEventLoop: true,
	functionVersion: "10",
	functionName: "xpto123",
	memoryLimitInMB: "64",
	logGroupName: "/aws/lambda/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
	logStreamName: "2020/10/21/[10]e319c9569d2d47ceb3b63e422e1b7c09",
	invokedFunctionArn:
		"arn:aws:lambda:xxxxxxx:1234567890:function:functionName:Current",
	awsRequestId: "149d19a7-13da-4cb6-a104-30328f94ca3a",
	getRemainingTimeInMillis: () => 1,

	// eslint-disable-next-line
	done: (): void => {},
	// eslint-disable-next-line
	fail: (): void => {},
	// eslint-disable-next-line
	succeed: (): void => {},
};

export const event: APIGatewayProxyEventV2 = {
	version: "2.0",
	routeKey: "POST /payments",
	rawPath: "/dev/payments",
	rawQueryString: "",
	headers: {
		accept: "*/*",
		"content-length": "313",
		"content-type":
			"multipart/form-data; boundary=------------------------63656a29fff0ed4a",
		host: "0ep58wind6.execute-api.eu-west-2.amazonaws.com",
		"user-agent": "curl/7.79.1",
		"x-amzn-trace-id": "Root=1-62d9dab8-78f23f3c0ac96ccb1429e302",
		"x-forwarded-for": "178.238.11.114",
		"x-forwarded-port": "443",
		"x-forwarded-proto": "https",
	},
	requestContext: {
		accountId: "483535153993",
		apiId: "0ep58wind6",
		domainName: "0ep58wind6.execute-api.eu-west-2.amazonaws.com",
		domainPrefix: "0ep58wind6",
		http: {
			method: "POST",
			path: "/dev/payments",
			protocol: "HTTP/1.1",
			sourceIp: "178.238.11.114",
			userAgent: "curl/7.79.1",
		},
		requestId: "Vo8c5j2NrPEEJWw=",
		routeKey: "POST /payments",
		stage: "dev",
		time: "21/Jul/2022:23:01:12 +0000",
		timeEpoch: 1658444472732,
	},
	body: "LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS02MzY1NmEyOWZmZjBlZDRhDQpDb250ZW50LURpc3Bvc2l0aW9uOiBmb3JtLWRhdGE7IG5hbWU9ImZpbGUiOyBmaWxlbmFtZT0icGF5bWVudHMuY3N2Ig0KQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0NCg0KRGF0ZSBFZmZlY3RpdmUsRGVzY3JpcHRpb24sQW1vdW50LEFjY291bnQgTm8sVm91Y2hlciBObw0KMjAyMi0wNy0xOCxSZWNlaXB0LC0xMzAwLjI2LDEwMDAxOTg4NjAsMTAwMDI1NTUxMjgNCg0KLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS02MzY1NmEyOWZmZjBlZDRhLS0NCg==",
	isBase64Encoded: true,
};
