import test from "ava";
import nock from "nock";

import { request } from "./index.js";

//
//
//

(() => {
	let scope: nock.Scope;
	const url = "https://dot.com";

	const client = request();

	test.before(() => {
		nock.disableNetConnect();
	});

	test.after(() => {
		nock.enableNetConnect();
	});

	test.afterEach((t) => {
		if (scope) {
			t.truthy(scope.isDone());
		}
	});

	test("should return a valid GET request", async (t) => {
		scope = nock(url).get("/").reply(200, { foo: "bar" });

		const body = await client(url).json();

		t.deepEqual(body, { foo: "bar" });
	});

	test("should return a valid POST request with a payload", async (t) => {
		const payload = { foo: "bar" };

		scope = nock(url).post("/post", payload).reply(201);

		const response = await client.post(`${url}/post`, { json: payload });

		t.is(response?.statusCode, 201);
	});

	test("should return a valid GET request with an empty body", async (t) => {
		scope = nock(url).get("/").reply(200);

		const response = await client(url);

		t.is(response?.body, "");
		t.is(response?.statusCode, 200);
	});

	test("should throw a 400 when the downstream server responds wtesth a 400", async (t) => {
		scope = nock(url).get("/").reply(400);

		const error = await t.throwsAsync(client(url));

		t.truthy(error);
		t.is(error?.message, "Response code 400 (Bad Request)");
	});

	test("should throw a 404 when the downstream server responds wtesth a 404", async (t) => {
		scope = nock(url).get("/").reply(404);

		const error = await t.throwsAsync(client(url));

		t.truthy(error);
		t.is(error?.message, "Response code 404 (Not Found)");
	});

	test("should throw a 502 when the downstream server responds wtesth a 500", async (t) => {
		scope = nock(url).get("/").reply(500);

		const error = await t.throwsAsync(client(url));

		t.truthy(error);
		t.is(error?.message, "Response code 500 (Internal Server Error)");
	});

	test("should throw an error when the socket timeout", async (t) => {
		scope = nock(url).get("/").delayConnection(200).reply(200);

		const error = await t.throwsAsync(
			client(url, { timeout: { request: 10 } })
		);

		t.truthy(error);
		t.is(error?.message, "Timeout awaiting 'request' for 10ms");
	});

	test("should return a payload with a string when the content-type is text/plain", async (t) => {
		scope = nock(url).get("/").reply(200, "123", {
			"Content-Type": "text/plain",
		});

		const body = await client(url).text();

		t.is(body, "123");
	});

	test("should throw an error when can't reach the downstream server", async (t) => {
		const error = await t.throwsAsync(client(url));

		t.truthy(error);
		t.truthy(error?.message);
	});
})();
