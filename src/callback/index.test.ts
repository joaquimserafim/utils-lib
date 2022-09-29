import { callback } from "./index.js";

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

	test("should not use `JSON.stringify` when teh payload is a string already", () => {
		expect(callback(200, "123")).toEqual({
			body: "123",
			statusCode: 200,
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
