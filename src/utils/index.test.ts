import {
	camelCase,
	camelToSnake,
	recCamelCase,
	recCamelCaseToSnakeCase,
} from "./index";

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

	describe("testing camelToSnake", () => {
		test("should convert from camelCase to snakeCase - string", () => {
			expect.hasAssertions();
			expect(camelToSnake("helloWorld")).toBe("hello_world");
		});

		test("should convert from camelCase to snakeCase - string[]", () => {
			expect.hasAssertions();
			expect(["helloWorld"].map(camelToSnake)).toEqual(["hello_world"]);
		});
	});

	describe("testing camelToSnake wiht js objects", () => {
		test("should convert from camelCase to snakeCase - 1 level object", () => {
			expect.hasAssertions();
			expect(recCamelCaseToSnakeCase({ helloWorld: "123" })).toEqual({
				hello_world: "123",
			});
		});

		test("should convert from camelCase to snakeCase - 2 level object", () => {
			expect.hasAssertions();
			expect(
				recCamelCaseToSnakeCase({ helloWorld: { isToday: "yes" } })
			).toEqual({
				hello_world: { is_today: "yes" },
			});
		});
	});
});
