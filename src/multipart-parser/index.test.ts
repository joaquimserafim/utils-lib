import test from "ava";
import { APIGatewayProxyEventV2 } from "aws-lambda";

import { camelCase, decode, multipartParser, unescape } from "./index.js";

//
//
//

(() => {
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

	test("should unescape a string", (t) => {
		t.is(unescape("This-is_goingto-escape"), "This+is/goingto+escape==");
	});

	test("should decode a buffer to a string using the defaults ", (t) => {
		t.is(decode("Tm9kZS5qcyBpcyBhd2Vzb21lLg"), "Node.js is awesome.");
	});

	test("should apply camel case multiple words", (t) => {
		const words = ["foo bar", "bar   foo", "f two", "b four"];

		t.deepEqual(words.map(camelCase), [
			"fooBar",
			"barFoo",
			"fTwo",
			"bFour",
		]);
	});

	test("should not change a string when is just one word", (t) => {
		t.is(camelCase("foobar"), "foobar");
	});

	const { headers, body } = event;

	const contentType = headers["content-type"];

	test("should throw an error when content-type is with bad format - case 1", async (t) => {
		await t.throwsAsync(async () => await multipartParser(), {
			instanceOf: Error,
		});
	});

	test("should throw an error when content-type is with bad format - case 2", async (t) => {
		await t.throwsAsync(
			async () => await multipartParser("multipart/form-data;"),
			{
				instanceOf: Error,
			}
		);
	});

	test("should throw an error when content-type is with bad format - case 3", async (t) => {
		await t.throwsAsync(
			async () => await multipartParser("multipart/form-data;"),
			{
				message: "content-type with bad format",
			}
		);
	});

	test("should throw an error when content-type is with bad format - case 3", async (t) => {
		await t.throwsAsync(
			async () =>
				await multipartParser(
					"multipart/form-data; boundary=------------------------"
				),

			{
				instanceOf: Error,
			}
		);
	});

	test("should throw an error when tokens does not match - case 1 bad content type", async (t) => {
		await t.throwsAsync(
			async () =>
				await multipartParser(
					"multipart/form-data; boundary=------------------------e0f697e4611742e3",
					body
				),
			{
				instanceOf: Error,
			}
		);
	});

	test("should throw an error when tokens does not match - case 2 bad body", async (t) => {
		await t.throwsAsync(
			async () => await multipartParser(contentType, "bad body"),
			{ message: "content-type with bad format" }
		);
	});

	test("should parse the form data", async (t) => {
		t.deepEqual(await multipartParser(contentType, body), [
			{
				accountNo: "1000198860",
				amount: "-1300.26",
				dateEffective: "2022-07-18",
				description: "Receipt",
				voucherNo: "10002555128",
			},
		]);
	});

	test.skip("should throw an error when data's header is not provided", async () => {
		// test to be implemented
	});
})();
