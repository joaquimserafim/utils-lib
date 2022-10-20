import { camelCase, recCamelCase } from "./index";

//
//
//

describe("testing utils lib", () => {
	describe("testing camelCase", () => {
		test("checking if when imported returns a function", () => {
			expect.hasAssertions();
			expect(typeof camelCase).toBe("function");
		});

		test("should convert the string `hello world` to camel case", () => {
			expect.hasAssertions();
			expect(camelCase("hello world")).toBe("helloWorld");
		});

		test("should convert from snake case to camel case", () => {
			expect.hasAssertions();
			expect(camelCase("hello_world")).toBe("helloWorld");
		});

		test("should convert a kehab case string to camel case", () => {
			expect.hasAssertions();
			expect(camelCase("hello--world")).toBe("helloWorld");
		});

		test("should convert from pascal case to camel case", () => {
			expect.hasAssertions();
			expect(camelCase("HelloWorld")).toBe("helloWorld");
		});
	});

	describe("testing recCamelCase", () => {
		test("should covert to camel case a nested object", () => {
			expect.hasAssertions();
			expect(
				recCamelCase({
					DocumentNo: "1213",
					Names: {
						FirstName: "Roht",
						Surname: "Bar",
						OtherName: "Foo",
					},
				})
			).toEqual({
				documentNo: "1213",
				names: { firstName: "Roht", otherName: "Foo", surname: "Bar" },
			});
		});
	});
});
