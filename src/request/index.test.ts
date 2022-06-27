import nock from "nock";

import { HttpMethod, request } from "./index";

import { log } from "../log/index";

//
//
//

describe("testing request lib", () => {
	let scope: nock.Scope;
	const url = "https://dot.com";

	beforeAll(() => {
		nock.disableNetConnect();
	});

	afterAll(() => {
		nock.enableNetConnect();
	});

	afterEach(() => {
		if (scope) {
			expect(scope.isDone()).toBeTruthy();
		}
	});

	it("should return a valid GET request", async () => {
		expect.hasAssertions();
		scope = nock(url).get("/").reply(200, { foo: "bar" });

		await expect(request<Record<"foo", string>>(url)).resolves.toEqual({
			foo: "bar",
		});
	});

	it("should return a valid POST request with a payload", async () => {
		expect.hasAssertions();

		const payload = { foo: "bar" };

		scope = nock(url).post("/post", payload).reply(201);

		await expect(
			request<undefined, Record<"foo", string>>(url, {
				method: HttpMethod.POST,
				path: "/post",
				body: payload,
			})
		).resolves.toEqual(undefined);
	});

	it("should return a valid GET request with an empty body", async () => {
		expect.hasAssertions();
		scope = nock(url).get("/").reply(200);

		await expect(request(url)).resolves.toEqual(undefined);
	});

	it("should throw a 400 when the downstream server responds with a 400", async () => {
		expect.hasAssertions();
		scope = nock(url).get("/").reply(400);

		await expect(request(url)).rejects.toThrowError("400");
	});

	it("should throw a 404 when the downstream server responds with a 404", async () => {
		expect.hasAssertions();
		scope = nock(url).get("/").reply(404);

		await expect(request(url)).rejects.toThrowError("404");
	});

	it("should throw a 502 when the downstream server responds with a 500", async () => {
		expect.hasAssertions();
		scope = nock(url).get("/").reply(500);

		await expect(request(url)).rejects.toThrowError("502");
	});

	it("should throw an error when the socket timeout", async () => {
		expect.hasAssertions();
		scope = nock(url).get("/").delayConnection(200).reply(200);

		await expect(request(url, { timeout: 10 })).rejects.toThrow(
			"The user aborted a request."
		);
	});

	it("should throw an error when can't reach the downstream server", async () => {
		expect.hasAssertions();

		await expect(request(url)).rejects.toThrow();
	});

	it("should accept a `log` object to print logs to the stdout", async () => {
		expect.hasAssertions();
		scope = nock(url).get("/").reply(200);

		const slogger = log("testing")({ id: "request" });

		await expect(request(url, { slogger })).resolves.toEqual(undefined);
	});

	it("should return a payload with string when the content-type is text/plain", async () => {
		expect.hasAssertions();
		scope = nock(url).get("/").reply(200, "123", {
			"Content-Type": "text/plain",
		});

		await expect(request(url)).resolves.toEqual("123");
	});
});
