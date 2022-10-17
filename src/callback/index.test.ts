import { callback } from "./index";

//
//
//

describe("testing the callback", () => {
	test("checking if exists as a function", () => {
		expect(typeof callback).toBe("function");
	});

	test("should return an object with props body: string and statusCode: number", () => {
		expect(callback(200, { foo: "bar" })).toEqual({
			body: '{"foo":"bar"}',
			statusCode: 200,
		});
	});

	test("should not use `JSON.stringify` when the payload is a string already", () => {
		expect(callback(200, "123")).toEqual({
			body: "123",
			statusCode: 200,
		});
	});

	test("should accept a headers argument", () => {
		expect(callback(200, undefined, { x: "123" })).toEqual({
			body: "",
			statusCode: 200,
			headers: { x: "123" },
		});
	});

	test("should return a 500 in case the statusCode is not passed", () => {
		//@ts-expect-error - in case of no args
		expect(callback()).toEqual({
			body: "",
			statusCode: 500,
		});
	});
});
