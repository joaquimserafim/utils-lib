import { marshall } from "@aws-sdk/util-dynamodb";
import { client } from "./client";
import {
	getItem,
	query,
	QueryProps,
	ReturnValueOptions,
	scan,
	updateItem,
	UpdateItemProps,
	count,
} from "./index";

import { User, user } from "../../../mocks/index";

//
//
//

jest.mock("./client");

//
//
//

describe("testing dynamodb lib", () => {
	const item = {
		id: "123",
		user: "Foo",
		email: "bar@foo.io",
	};

	beforeEach(() => {
		(client.send as jest.Mock).mockReset();
	});

	describe("testing count query", () => {
		it("should return an error", async () => {
			(client.send as jest.Mock).mockRejectedValueOnce("some error");

			await expect(count("test")).rejects.toEqual("some error");
		});

		it("should return the count for a given table", async () => {
			(client.send as jest.Mock).mockResolvedValue({ Count: 10 });

			await expect(count("test")).resolves.toEqual(10);
		});
	});

	describe("testing scan query", () => {
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
				lastKey: {},
			});
		});

		it("should return a list of items passing the key", async () => {
			(client.send as jest.Mock).mockResolvedValue({
				Items: [marshall(item)],
			});

			await expect(
				scan("test", { exclusiveStartKey: "123" })
			).resolves.toEqual({
				data: [item],
				lastKey: {},
			});
		});

		it("should return an empty [] when nothing returns from dynamodb", async () => {
			(client.send as jest.Mock).mockResolvedValue({
				Items: undefined,
			});

			await expect(
				scan("test", { exclusiveStartKey: "123" })
			).resolves.toEqual({
				data: [],
				lastKey: {},
			});
		});
	});

	describe("testing getItem query", () => {
		it("should return an error", async () => {
			expect.hasAssertions();
			(client.send as jest.Mock).mockRejectedValueOnce("some error");

			await expect(getItem<User>("table", "123")).rejects.toBe(
				"some error"
			);
		});

		it("should find and return an item", async () => {
			expect.hasAssertions();

			(client.send as jest.Mock).mockResolvedValue({
				Item: user,
			});

			await expect(getItem<User>("table", "123")).resolves.toEqual(user);
		});

		it("should find and return an item", async () => {
			expect.hasAssertions();
			(client.send as jest.Mock).mockResolvedValue({});

			await expect(getItem<User>("table", "123")).resolves.toEqual(
				undefined
			);
		});

		it("should find and return an item with the selected attributes", async () => {
			expect.hasAssertions();
			(client.send as jest.Mock).mockResolvedValue({
				Item: { id: "123" },
			});

			await expect(
				getItem<User>("table", "123", ["id"])
			).resolves.toEqual({ id: "123" });
		});
	});

	describe("testing udpateItem query", () => {
		const filter: UpdateItemProps = {
			expressionAttributeNames: {
				"#name": "name",
			},
			updateExpression: "set #name = :newValue",
			expressionAttributeValues: {
				":newValue": "foo bar",
			},
		};

		it("should return an error", async () => {
			expect.hasAssertions();
			(client.send as jest.Mock).mockRejectedValueOnce("some error");

			await expect(updateItem("table", "123", filter)).rejects.toBe(
				"some error"
			);
		});

		it("should updateItem an item and returns the default value", async () => {
			expect.hasAssertions();
			(client.send as jest.Mock).mockResolvedValue({
				Attributes: {},
			});

			await expect(updateItem("table", "123", filter)).resolves.toEqual(
				0
			);
		});

		it("should updateItem an item and returns the new values", async () => {
			expect.hasAssertions();
			(client.send as jest.Mock).mockResolvedValue({
				Attributes: { id: "123", name: "foo bar" },
			});

			await expect(
				updateItem("table", "123", {
					...filter,
					returnValues: ReturnValueOptions.AllNew,
				})
			).resolves.toEqual({ id: "123", name: "foo bar" });
		});
	});

	describe("testing mormal query cmd", () => {
		const params: QueryProps = {
			keyConditionExpression: "id = :id",
			expressionAttributeValues: {
				":id": "123",
			},
		};

		it("should return an error", async () => {
			expect.hasAssertions();
			(client.send as jest.Mock).mockRejectedValueOnce("some error");

			await expect(query<User>("table", params)).rejects.toBe(
				"some error"
			);
		});

		it("should find and return some items", async () => {
			expect.hasAssertions();

			(client.send as jest.Mock).mockResolvedValue({
				Items: [user],
			});

			await expect(query<User[]>("table", params)).resolves.toEqual([
				user,
			]);
		});

		it("should return an empty [] when not find", async () => {
			expect.hasAssertions();

			(client.send as jest.Mock).mockResolvedValue({
				Items: undefined,
			});

			await expect(query<User[]>("table", params)).resolves.toEqual([]);
		});
	});
});
