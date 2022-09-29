import { thrower } from "./index.js";

describe("Testing thrower", () => {
	test("should be a function", () => {
		expect.hasAssertions();
		expect(typeof thrower).toBe("function");
	});

	test("should throw an error passign an error message", () => {
		expect.hasAssertions();
		expect(thrower("hello world")).toThrowError("hello world");
	});

	test("should throw an error even no message passed", () => {
		expect.hasAssertions();
		//@ts-expect-error expected
		expect(thrower()).toThrowError();
	});
});
