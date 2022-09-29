import { APIGatewayProxyEventV2 } from "aws-lambda";

import { camelCase, decode, parser, unescape } from "./index.js";

//
//
//

const event: APIGatewayProxyEventV2 = {
	version: "2.0",
	routeKey: "POST /payments",
	rawPath: "/dev/payments",
	rawQueryString: "",
	headers: {
		accept: "*/*",
		"content-length": "313",
		"content-type":
			"multipart/form-data; boundary=------------------------e0f697e4611742e4",
		host: "dev.kamoa.services",
		"user-agent": "curl/7.79.1",
		"x-amzn-trace-id": "Root=1-62da9da6-0c6d13e569c9eed8556757b8",
		"x-forwarded-for": "45.149.175.238",
		"x-forwarded-port": "443",
		"x-forwarded-proto": "https",
	},
	requestContext: {
		accountId: "483535153993",
		apiId: "0ep58wind6",
		domainName: "dev.kamoa.services",
		domainPrefix: "dev",
		http: {
			method: "POST",
			path: "/dev/payments",
			protocol: "HTTP/1.1",
			sourceIp: "45.149.175.238",
			userAgent: "curl/7.79.1",
		},
		requestId: "Vq2SEizbLPEEP1w=",
		routeKey: "POST /payments",
		stage: "dev",
		time: "22/Jul/2022:12:52:54 +0000",
		timeEpoch: 1658494374674,
	},
	body: "LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lMGY2OTdlNDYxMTc0MmU0DQpDb250ZW50LURpc3Bvc2l0aW9uOiBmb3JtLWRhdGE7IG5hbWU9ImZpbGUiOyBmaWxlbmFtZT0icGF5bWVudHMuY3N2Ig0KQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0NCg0KRGF0ZSBFZmZlY3RpdmUsRGVzY3JpcHRpb24sQW1vdW50LEFjY291bnQgTm8sVm91Y2hlciBObw0KMjAyMi0wNy0xOCxSZWNlaXB0LC0xMzAwLjI2LDEwMDAxOTg4NjAsMTAwMDI1NTUxMjgNCg0KLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lMGY2OTdlNDYxMTc0MmU0LS0NCg==",
	isBase64Encoded: true,
};

//
//
//

describe("testing multipart-parser functions", () => {
	describe("unescape", () => {
		test("should unescape a string", () => {
			expect.hasAssertions();
			expect(unescape("This-is_goingto-escape")).toBe(
				"This+is/goingto+escape=="
			);
		});
	});

	describe("decode", () => {
		test("should decode a buffer to a string using the defaults ", () => {
			expect.hasAssertions();
			expect(decode("Tm9kZS5qcyBpcyBhd2Vzb21lLg")).toBe(
				"Node.js is awesome."
			);
		});
	});

	describe("camelCase", () => {
		const words = ["foo bar", "bar   foo", "f two", "b four"];

		test("should apply camel case multiple words", () => {
			expect.hasAssertions();
			expect(words.map(camelCase)).toEqual([
				"fooBar",
				"barFoo",
				"fTwo",
				"bFour",
			]);
		});

		test("should not change a string when is just one word", () => {
			expect.hasAssertions();
			expect(camelCase("foobar")).toEqual("foobar");
		});
	});

	describe("parser", () => {
		const { headers, body } = event;

		const contentType = headers["content-type"];

		test("should throw an error when content-type is with bad format - case 1", async () => {
			expect.hasAssertions();
			await expect(parser()).rejects.toEqual(
				"content-type with bad format"
			);
		});

		test("should throw an error when content-type is with bad format - case 2", async () => {
			expect.hasAssertions();
			await expect(parser("multipart/form-data;")).rejects.toEqual(
				"content-type with bad format"
			);
		});

		test("should throw an error when content-type is with bad format - case 3", async () => {
			expect.hasAssertions();
			await expect(
				parser("multipart/form-data; boundary=")
			).rejects.toEqual("content-type with bad format");
		});

		test("should throw an error when content-type is with bad format - case 3", async () => {
			expect.hasAssertions();
			await expect(
				parser("multipart/form-data; boundary=------------------------")
			).rejects.toEqual("content-type with bad format");
		});

		test("should throw an error when tokens does not match - case 1 bad content type", async () => {
			expect.hasAssertions();
			await expect(
				parser(
					"multipart/form-data; boundary=------------------------e0f697e4611742e3",
					body
				)
			).rejects.toEqual("form data token does not match");
		});

		test("should throw an error when tokens does not match - case 2 bad body", async () => {
			expect.hasAssertions();
			await expect(parser(contentType, "bad body")).rejects.toEqual(
				"form data token does not match"
			);
		});

		test("should parse the form data", async () => {
			expect.hasAssertions();
			await expect(parser(contentType, body)).resolves.toEqual([
				{
					accountNo: "1000198860",
					amount: "-1300.26",
					dateEffective: "2022-07-18",
					description: "Receipt",
					voucherNo: "10002555128",
				},
			]);
		});

		xtest("should throw an error when data's header is not provided", async () => {
			// test to be implemented
		});
	});
});
