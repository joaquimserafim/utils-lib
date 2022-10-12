import test from "ava";

import { guard } from "./index.js";

//
//
//

test("should be a function", (t) => {
	t.is(typeof guard, "function");
});

test("should test the given expression and return a value from the callback/return action", (t) => {
	t.is(
		guard(1 === 1, () => 1),
		1
	);
});

test("should return false when the guard expression does not match", (t) => {
	t.is(
		guard(false, () => 1),
		false
	);
});

test("should throw when the callback/return action throws", (t) => {
	t.throws(
		() =>
			guard(1 === 1, () => {
				throw new Error();
			}),
		{ instanceOf: Error }
	);
});
