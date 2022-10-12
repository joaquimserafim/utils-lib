import { client } from "./client";
import { sendSMS } from "./index";

import { sns } from "../../../mocks/index";

//
//
//

jest.mock("./client");

//
//
//

describe("testing sns lib", () => {
	beforeEach(() => {
		(client.send as jest.Mock).mockReset();
	});

	describe("tsting sms", () => {
		it("should return an error", async () => {
			(client.send as jest.Mock).mockRejectedValueOnce("some error");

			await expect(sendSMS("12345678", "foo bar")).rejects.toEqual(
				"some error"
			);
		});

		it("should publish a message", async () => {
			(client.send as jest.Mock).mockResolvedValue(sns.response);

			await expect(sendSMS("12345678", "foo bar")).resolves.toEqual(
				sns.response
			);
		});
	});
});
