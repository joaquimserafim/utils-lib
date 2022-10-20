import { sqs } from "../../../mocks/index";

import { client } from "./client";
import { publish } from "./index";

//
//
//

jest.mock("./client");

//
//
//

describe("testing sqs lib", () => {
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
