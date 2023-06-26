import { client } from "./client";
import { send } from "./index";

//
//
//

jest.mock("./client");

//
//
//

const response = {
	MessageId: "EXAMPLE78603177f-7a5433e7-8edb-42ae-af10-f0181f34d6ee-000000",
};

//
//
//

describe("testing ses lib", () => {
	beforeEach(() => {
		(client.send as jest.Mock).mockReset();
	});

	describe("testing send email", () => {
		it("should return an error", async () => {
			(client.send as jest.Mock).mockRejectedValueOnce("some error");

			await expect(
				send("foo@bar", "bar@foo", "test", "hello world")
			).rejects.toEqual("some error");
		});

		it("should publish a message", async () => {
			(client.send as jest.Mock).mockResolvedValue(response);

			await expect(
				send("foo@bar", "bar@foo", "test", "hello world")
			).resolves.toEqual(response.MessageId);
		});
	});
});
