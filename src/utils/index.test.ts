import { setTimeout as delay } from "node:timers/promises";

import {
	betweenRange,
	camelCase,
	camelToSnake,
	getTimeMs,
	hash,
	levenshteinDistance,
	recCamelCase,
	recCamelCaseToSnakeCase,
} from "./index";

//
//
//

describe("testing utils lib", () => {
	describe("camelCase", () => {
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

	describe("recCamelCase", () => {
		test("should convert to camel case a nested object", () => {
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

		test("should convert and not change the data type - empty array scenario", () => {
			expect(recCamelCase({ foo_bar: [] })).toEqual({ fooBar: [] });
		});
	});

	describe("camelToSnake", () => {
		test("should convert from camelCase to snakeCase - string", () => {
			expect.hasAssertions();
			expect(camelToSnake("helloWorld")).toBe("hello_world");
		});

		test("should convert from camelCase to snakeCase - string[]", () => {
			expect.hasAssertions();
			expect(["helloWorld"].map(camelToSnake)).toEqual(["hello_world"]);
		});
	});

	describe("camelToSnake wiht js objects", () => {
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

		test("should convert from camelCase to snakeCase - with arrays", () => {
			expect.hasAssertions();
			expect(
				recCamelCaseToSnakeCase({ helloWorld: { isToday: ["yes"] } })
			).toEqual({
				hello_world: { is_today: ["yes"] },
			});
		});
	});

	describe("getTimeMs", () => {
		test("should compute a given time in ms", async () => {
			const startTime = process.hrtime();

			await delay(500);

			expect.hasAssertions();
			expect(getTimeMs(process.hrtime(startTime))).toBeGreaterThan(500);
		});
	});

	describe("betweenRange", () => {
		test("should match a given number between 2 numbers", () => {
			expect.hasAssertions();
			expect(betweenRange(2, 1, 3)).toBe(true);
		});

		test("should not match a given number between 2 numbers", () => {
			expect.hasAssertions();
			expect(betweenRange(2, 3, 3)).toBe(false);
		});
	});

	describe("hash", () => {
		test("should return the hash for a given string", () => {
			expect.hasAssertions();
			expect(hash("hello world")).toBeGreaterThan(0);
		});
	});

	describe("levenshteinDistance", () => {
		test("shoudl return 1 as the distance between the 2 strings", () => {
			expect.hasAssertions();
			expect(levenshteinDistance("ABc", "ABC")).toBe(1);
		});
	});
});
