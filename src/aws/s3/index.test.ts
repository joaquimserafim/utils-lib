import { client } from "./client";

import { save } from "./index";

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

	describe("testing sms", () => {
		it("should return an error", async () => {
			(client.send as jest.Mock).mockRejectedValueOnce("some error");

			await expect(save("foo", "bar", "123")).rejects.toEqual(
				"some error"
			);
		});

		it("should save an object", async () => {
			(client.send as jest.Mock).mockResolvedValue("ok");

			await expect(save("foo", "bar", "123")).resolves.toEqual("ok");
		});
	});
});
