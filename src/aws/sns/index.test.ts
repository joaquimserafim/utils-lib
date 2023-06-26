import { client } from "./client";
import { publishToTopic, sendSms } from "./index";

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

	describe("testing sms", () => {
		it("should return an error", async () => {
			(client.send as jest.Mock).mockRejectedValueOnce("some error");

			await expect(sendSms("12345678", "foo bar")).rejects.toEqual(
				"some error"
			);
		});

		it("should publish a message", async () => {
			(client.send as jest.Mock).mockResolvedValue(sns.response);

			await expect(sendSms("12345678", "foo bar")).resolves.toEqual(
				sns.response
			);
		});
	});

	describe("testing publish to topic", () => {
		it("should return an error", async () => {
			(client.send as jest.Mock).mockRejectedValueOnce("some error");

			await expect(
				publishToTopic("12345678", "123", "foo bar")
			).rejects.toEqual("some error");
		});

		it("should publish a message - string", async () => {
			(client.send as jest.Mock).mockResolvedValue(sns.response);

			await expect(
				publishToTopic("12345678", "123", "foo bar")
			).resolves.toEqual(sns.response);
		});

		it("should publish a message - js object", async () => {
			(client.send as jest.Mock).mockResolvedValue(sns.response);

			await expect(
				publishToTopic("12345678", "123", { foo: "bar" })
			).resolves.toEqual(sns.response);
		});
	});
});
