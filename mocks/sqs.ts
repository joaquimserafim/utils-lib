//
//
//

export const response = {
	$metadata: {
		httpStatusCode: 200,
		requestId: "da4ad138-ee2e-55ba-85ea-8af8295c0320",
		attempts: 1,
		totalRetryDelay: 0,
	},
	MD5OfMessageBody: "3ccc8c7ac00e2dad29af09953143bf70",
	MD5OfMessageAttributes: "20b082d2cb3ab019a1fb5e9a22d6467c",
	MessageId: "42bfdf57-6d24-40cf-abf1-00790da37366",
};

//
//
//

export const event = {
	Records: [
		{
			messageId: "42bfdf57-6d24-40cf-abf1-00790da37366",
			receiptHandle:
				"AQEBtCvIyDrOH1mUXoL06tszpSy289lsaBfW8xiuiQ2gnnW2P9SshUJNR4loMjhKaLI4GL6eeeJOyZ21NPZpsTaNUHQf7KeLqiCUQ46HF+W725X4JxqQjL0KJG4rQdLxrgp0NVN56Ylau9BkeZW7dppZRM4TOeLXH/2Jp5yEKpkzQBYGdUygoyk4DM/2yAoMleKx1VoZ6u3m5rUmdHwuXNmbYWO1sNiK7d3H59GOlK13AAPGAXogqhgacji8Pd73z6IHmfUI2Wrv/UhqN4auWawD4B5ooDFbEXxA1ZAWwTJcQUMk0IcMRbfLTvt+vdD5xikUvTVkxmItLLl62sRQRszz+M8G7tbx9bbwaiGLSdEro2s+rXkScALVbyuSA83WtAQX",
			body: '{"msg":"foo","timestamp":1665582386261}',
			attributes: {
				ApproximateReceiveCount: "1",
				AWSTraceHeader:
					"Root=1-6346c531-6013bd254f2539b80a95ed01;Parent=7acc567740984150;Sampled=1",
				SentTimestamp: "1665582386732",
				SenderId: "AROAXBFHQ5NE6DTLS6JTF:test-svc-receiver-lambda-dev",
				ApproximateFirstReceiveTimestamp: "1665582387732",
			},
			messageAttributes: {
				awsRequestId: {
					stringValue: "57e44ba7-c059-45ac-9727-21b03f056499",
					stringListValues: [],
					binaryListValues: [],
					dataType: "String",
				},
			},
			md5OfMessageAttributes: "20b082d2cb3ab019a1fb5e9a22d6467c",
			md5OfBody: "3ccc8c7ac00e2dad29af09953143bf70",
			eventSource: "aws:sqs",
			eventSourceARN: "arn:aws:sqs:eu-west-2:483535153993:raf",
			awsRegion: "eu-west-2",
		},
	],
};

export const context = {
	callbackWaitsForEmptyEventLoop: false,
	functionVersion: "$LATEST",
	functionName: "test-svc-processor-lambda-dev",
	memoryLimitInMB: "128",
	logGroupName: "/aws/lambda/test-svc-processor-lambda-dev",
	logStreamName: "2022/10/12/[$LATEST]6e2500c19adc4a2aa703ef00ad7b50a7",
	invokedFunctionArn:
		"arn:aws:lambda:eu-west-2:483535153993:function:test-svc-processor-lambda-dev",
	awsRequestId: "1480428d-18c9-5fc0-bf76-194dd1af4aec",
};
