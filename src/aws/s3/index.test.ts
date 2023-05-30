import { client } from "./client";

import { get, put } from "./index";

//
//
//

jest.mock("./client");

//
//
//

describe("testing s3 lib", () => {
	beforeEach(() => {
		(client.send as jest.Mock).mockReset();
	});

	describe("put", () => {
		it("should return an error", async () => {
			(client.send as jest.Mock).mockRejectedValueOnce("some error");

			await expect(put("foo", "bar", "123")).rejects.toEqual(
				"some error"
			);
		});

		it("should put an object", async () => {
			(client.send as jest.Mock).mockResolvedValue("ok");

			await expect(put("foo", "bar", "123")).resolves.toEqual("ok");
		});
	});

	describe("get", () => {
		it("should return an error", async () => {
			(client.send as jest.Mock).mockRejectedValueOnce("some error");

			await expect(get("foo", "bar")).rejects.toEqual("some error");
		});

		it("should get an object", async () => {
			(client.send as jest.Mock).mockResolvedValue({
				Body: { transformToString: async () => "123" },
			});

			await expect(get("foo", "bar")).resolves.toEqual("123");
		});
	});
});
