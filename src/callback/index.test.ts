import test from "ava";

import { callback } from "./index.js";

//
//
//

test("checking if exists as a function", (t) => {
	t.is(typeof callback, "function");
});

test("should return an object with props body: string and statusCode: number", (t) => {
	t.deepEqual(callback(200, { foo: "bar" }), {
		body: '{"foo":"bar"}',
		statusCode: 200,
	});
});

test("should not use `JSON.stringify` when teh payload is a string already", (t) => {
	t.deepEqual(callback(200, "123"), {
		body: "123",
		statusCode: 200,
	});
});

test("should return a 500 in case the statusCode is not passed", (t) => {
	//@ts-expect-error - in case of no args
	t.deepEqual(callback(), {
		body: "",
		statusCode: 500,
	});
});
