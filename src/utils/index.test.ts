import { camelCase } from "./index.js";

//
//
//

describe("testing utils lib", () => {
	describe("testing camelCase", () => {
		test("checking if when imported returns a function", () => {
			expect(typeof camelCase).toBe("function");
		});

		test("should camelCase a string from space separated - all lowercase", () => {
			expect(camelCase("hello world")).toBe("helloWorld");
		});

		test("should camelCase a string from space separated - all uppercase", () => {
			expect(camelCase("HELLO WORLD")).toBe("helloWorld");
		});
	});
});
