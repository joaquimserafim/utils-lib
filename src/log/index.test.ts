import test from "ava";

import { log } from "./index.js";

(() => {
	const logger = log("testing");

	let captureOutput = "";

	test("Checking if when imported returns a function", (t) => {
		t.is(typeof log, "function");
	});

	test("Checking if when imported returns a closure", (t) => {
		t.is(typeof log("awsRequestId"), "function");
	});

	const ll = logger({ id: "1234567890" });

	test("Checking if when initialized returns the props `info` & `error`", (t) => {
		t.deepEqual(Object.keys(ll), ["info", "error"]);
	});

	test("Checking `info` is a function`", (t) => {
		t.is(typeof ll.info, "function");
	});

	test("Checking `error` is a function`", (t) => {
		t.is(typeof ll.error, "function");
	});

	test.beforeEach((t) => {
		const stdoutWrite = process.stdout.write;

		process.stdout.write = (text: string): boolean => {
			captureOutput = text;
			process.stdout.write = stdoutWrite;
			return true;
		};
	});

	test("Processing a log entry with an `error` message:string", (t) => {
		logger({ awsRequestId: "1234567890" }).error({
			msg: "this is an error message",
		});

		const record = JSON.parse(captureOutput);

		t.deepEqual(Object.keys(record), [
			"api",
			"awsRequestId",
			"entry",
			"origin",
			"env",
			"timestamp",
			"type",
			"version",
		]);
		t.deepEqual(record.entry, { msg: "this is an error message" });
	});

	test("Processing a log entry with an `info` message:string", (t) => {
		logger({ awsRequestId: "1234567890" }).info({
			msg: "this is an info message",
		});

		const record = JSON.parse(captureOutput);

		t.deepEqual(Object.keys(record), [
			"api",
			"awsRequestId",
			"entry",
			"origin",
			"env",
			"timestamp",
			"type",
			"version",
		]);
		t.deepEqual(record.entry, { msg: "this is an info message" });
	});

	test("Processing a log entry with an `info` message:object", (t) => {
		logger({ awsRequestId: "1234567890" }).info({
			headers: [{ "content-type": "application/javascript" }],
			body: { hello: "world" },
		});

		const record = JSON.parse(captureOutput);

		t.deepEqual(Object.keys(record), [
			"api",
			"awsRequestId",
			"entry",
			"origin",
			"env",
			"timestamp",
			"type",
			"version",
		]);
		t.is(typeof record.entry, "object");
	});

	test("Processing a log entry with an `info` message:object with a compound id", (t) => {
		logger({ id: "1234567890", extraId: "foo£bar" }).info({
			body: { hello: "world" },
		});

		const record = JSON.parse(captureOutput);

		t.deepEqual(Object.keys(record), [
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
})();
