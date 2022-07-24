import { client } from "./client";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

//
// scan data by batches
//

interface ScanOutput<T> {
	readonly data: T[];
	readonly lastKey?: string;
}

export const scan = async <T = unknown>(
	tableName: string,
	key?: string,
	limit?: number
): Promise<ScanOutput<T>> => {
	const filter = key ? { ExclusiveStartKey: marshall({ id: key }) } : {};

	const command = new ScanCommand({
		TableName: tableName,
		Limit: limit || 25,
		...filter,
	});

	const { Items: items, LastEvaluatedKey: lastEvaluatedKey } =
		await client.send(command);

	const data = (items || []).map((item) => unmarshall(item) as T);
	const lastKey = unmarshall(lastEvaluatedKey || {}).id;

	return { data, lastKey };
};

//
//
//

export const get = () => 1;
