// import { marshall } from "@aws-sdk/util-dynamodb";

import { marshall } from "@aws-sdk/util-dynamodb";
import { client } from "./client";
import { scan } from "./index";

//
//
//

jest.mock("./client");

//
//
//

describe("testign dynamodb lib", () => {
	const item = {
		id: "123",
		user: "Foo",
		email: "bar@foo.io",
	};

	beforeEach(() => {
		(client.send as jest.Mock).mockReset();
	});

	it("should return an error", async () => {
		(client.send as jest.Mock).mockRejectedValueOnce("some error");

		await expect(scan("test")).rejects.toEqual("some error");
	});

	it("should return a list of items", async () => {
		(client.send as jest.Mock).mockResolvedValue({
			Items: [marshall(item)],
		});

		await expect(scan("test")).resolves.toEqual({
			data: [item],
			lastKey: undefined,
		});
	});
});
