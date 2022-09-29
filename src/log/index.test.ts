import { log } from "./index.js";

describe("Testing the `log` lib", () => {
	const logger = log("testing");

	let captureOutput = "";

	describe("Testing interface", () => {
		test("Checking if when imported returns a function", () => {
			expect(typeof log).toBe("function");
		});

		test("Checking if when imported returns a closure", () => {
			expect(typeof log("awsRequestId")).toBe("function");
		});

		const ll = logger({ id: "1234567890" });

		test("Checking if when initialized returns the props `info` & `error`", () => {
			expect(Object.keys(ll)).toEqual(["info", "error"]);
		});

		test("Checking `info` is a function`", () => {
			expect(typeof ll.info).toBe("function");
		});

		test("Checking `error` is a function`", () => {
			expect(typeof ll.error).toBe("function");
		});
	});

	describe("Testing outputs", () => {
		beforeEach(() => {
			const stdoutWrite = process.stdout.write;

			process.stdout.write = (text: string): boolean => {
				captureOutput = text;
				process.stdout.write = stdoutWrite;
				return true;
			};
		});

		test("Processing a log entry with an `error` message:string", () => {
			logger({ awsRequestId: "1234567890" }).error({
				msg: "this is an error message",
			});

			const record = JSON.parse(captureOutput);

			expect(Object.keys(record)).toEqual([
				"api",
				"awsRequestId",
				"entry",
				"origin",
				"env",
				"timestamp",
				"type",
				"version",
			]);
			expect(record.entry).toEqual({ msg: "this is an error message" });
		});

		test("Processing a log entry with an `info` message:string", () => {
			logger({ awsRequestId: "1234567890" }).info({
				msg: "this is an info message",
			});

			const record = JSON.parse(captureOutput);

			expect(Object.keys(record)).toEqual([
				"api",
				"awsRequestId",
				"entry",
				"origin",
				"env",
				"timestamp",
				"type",
				"version",
			]);
			expect(record.entry).toEqual({ msg: "this is an info message" });
		});

		test("Processing a log entry with an `info` message:object", () => {
			logger({ awsRequestId: "1234567890" }).info({
				headers: [{ "content-type": "application/javascript" }],
				body: { hello: "world" },
			});

			const record = JSON.parse(captureOutput);

			expect(Object.keys(record)).toEqual([
				"api",
				"awsRequestId",
				"entry",
				"origin",
				"env",
				"timestamp",
				"type",
				"version",
			]);
			expect(typeof record.entry).toBe("object");
		});

		test("Processing a log entry with an `info` message:object", () => {
			logger({ id: "1234567890", extraId: "foo£bar" }).info({
				body: { hello: "world" },
			});

			const record = JSON.parse(captureOutput);

			expect(Object.keys(record)).toEqual([
				"api",
				"id",
				"extraId",
				"entry",
				"origin",
				"env",
				"timestamp",
				"type",
				"version",
			]);
		});
	});
});
