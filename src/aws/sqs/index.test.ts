import { sqs } from "../../../mocks/index";

import { client } from "./client";
import { publish, pubEvent } from "./index";

//
//
//

jest.mock("./client");

//
//
//

describe("testing sqs lib", () => {
	describe("publish", () => {
		const msg = { msg: "foo", timestamp: 1665582386261 };

		const pub = publish("some-url", "1234567");

		beforeEach(() => {
			(client.send as jest.Mock).mockReset();
		});

		it("should return an error", async () => {
			(client.send as jest.Mock).mockRejectedValueOnce("some error");

			await expect(pub(msg)).rejects.toEqual("some error");
		});

		it("should publish a message and stringify when is an object", async () => {
			(client.send as jest.Mock).mockResolvedValue(sqs.response);

			await expect(pub(msg)).resolves.toEqual(sqs.response);
		});

		it("should publish a message when passing a string", async () => {
			(client.send as jest.Mock).mockResolvedValue(sqs.response);

			await expect(pub("test123")).resolves.toEqual(sqs.response);
		});
	});

	describe("pubEvent", () => {
		const event =
			"I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhauser Gate. All those moments will be lost in time, like tears in rain.";

		beforeEach(() => {
			(client.send as jest.Mock).mockReset();
		});

		it("should return an error", async () => {
			(client.send as jest.Mock).mockRejectedValueOnce("some error");

			await expect(
				pubEvent<string>("Tannhauser Gate", "roy", {
					timestamp: Date.now(),
					type: "replicant",
					event,
				})
			).rejects.toEqual("some error");
		});

		it("should publish a message and stringify when is an object", async () => {
			(client.send as jest.Mock).mockResolvedValue(sqs.response);

			await expect(
				pubEvent<string>("Spinner", "deckard", {
					timestamp: Date.now(),
					type: "human",
					event,
				})
			).resolves.toEqual(sqs.response);
		});

		it("should publish a message when passing a string", async () => {
			(client.send as jest.Mock).mockResolvedValue(sqs.response);

			await expect(
				pubEvent<string>("nowhere everywehere", "rachael", {
					timestamp: Date.now(),
					type: "eai",
					event,
				})
			).resolves.toEqual(sqs.response);
		});
	});
});
