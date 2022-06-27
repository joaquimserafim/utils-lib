import { guard } from "./index";

//
//
//

describe("Testing guard", () => {
	test("should be a function", () => {
		expect(typeof guard).toBe("function");
	});

	test("should test the given expression and return a value from the callback/return action", () => {
		expect(guard(1 === 1, () => 1)).toBe(1);
	});

	test("should return false when the guard expression does not match", () => {
		//@ts-expect-error expected error
		expect(guard(1 === 2, () => 1)).toBe(false);
	});

	test("should throw when the callback/return action throws", () => {
		expect(() =>
			guard(1 === 1, () => {
				throw "error";
			})
		).toThrow();
	});
});
