import { client } from "./client";
import {
	GetCommand,
	GetCommandInput,
	QueryCommand,
	QueryCommandInput,
	UpdateCommand,
	UpdateCommandInput,
	ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import {
	marshall,
	NativeAttributeBinary,
	unmarshall,
} from "@aws-sdk/util-dynamodb";
import { AttributeValue, ReturnValue } from "@aws-sdk/client-dynamodb";

//
//
//

const prcUnmarshall = (
	value: Record<string, AttributeValue>
): Record<string, NativeAttributeBinary> => {
	try {
		return unmarshall(value);
	} catch {
		return value;
	}
};

//
// get table count
//

export const count = async (tableName: string): Promise<number | undefined> =>
	(
		await client.send(
			new ScanCommand({ TableName: tableName, Select: "COUNT" })
		)
	).Count;

//
// scan data by batches
//

interface ScanOutput<T> {
	readonly data: T[];
	readonly lastKey?: Record<string, NativeAttributeBinary>;
}

interface ScanParams {
	readonly exclusiveStartKey?: string;
	readonly limit?: number;
	readonly expressionAttributeNames?: Record<string, string>;
	readonly expressionAttributeValues?: Record<string, unknown>;
	readonly filterExpression?: string;
	readonly attributes?: string[];
	readonly indexName?: string;
}

export const scan = async <T = unknown>(
	tableName: string,
	params?: ScanParams
): Promise<ScanOutput<T>> => {
	const {
		exclusiveStartKey,
		limit,
		expressionAttributeNames,
		expressionAttributeValues,
		filterExpression,
		indexName,
		attributes,
	} = params || {};

	const command = new ScanCommand({
		TableName: tableName,
		Limit: limit || 25,
		ExpressionAttributeNames: expressionAttributeNames,
		ExpressionAttributeValues: expressionAttributeValues,
		FilterExpression: filterExpression,
		ProjectionExpression: attributes?.join(","),
		IndexName: indexName,
		ExclusiveStartKey: exclusiveStartKey
			? marshall({ id: exclusiveStartKey })
			: undefined,
	});

	const { Items: items, LastEvaluatedKey: lastEvaluatedKey } =
		await client.send(command);

	const data = (items || []).map((item) => unmarshall(item) as T);
	const lastKey = prcUnmarshall(lastEvaluatedKey || {});

	return { data, lastKey };
};

//
//
//

export const getItem = async <T = undefined>(
	tableName: string,
	id: string,
	attributes?: string[]
): Promise<T> => {
	const params: GetCommandInput = {
		Key: { id },
		ProjectionExpression: attributes?.join(","),
		TableName: tableName,
	};

	const { Item } = await client.send(new GetCommand(params));

	return Item as T;
};

//
//
//

export interface QueryProps {
	readonly keyConditionExpression: string;
	readonly expressionAttributeNames?: Record<string, string>;
	readonly expressionAttributeValues: Record<string, unknown>;
	readonly filterExpression?: string;
	readonly attributes?: string[];
	readonly indexName?: string;
}

export const query = async <T = undefined>(
	tableName: string,
	{
		keyConditionExpression,
		expressionAttributeNames,
		expressionAttributeValues,
		filterExpression,
		attributes,
		indexName,
	}: QueryProps
): Promise<T[]> => {
	const params: QueryCommandInput = {
		TableName: tableName,
		ExpressionAttributeNames: expressionAttributeNames,
		ExpressionAttributeValues: expressionAttributeValues,
		KeyConditionExpression: keyConditionExpression,
		FilterExpression: filterExpression,
		ProjectionExpression: attributes?.join(","),
		IndexName: indexName,
	};

	const { Items } = await client.send(new QueryCommand(params));

	return (Items || []) as T[];
};

//
//
//

export enum ReturnValueOptions {
	AllNew = "ALL_NEW",
	AllOld = "ALL_OLD",
	None = "NONE",
	UpdatedNew = "UPDATED_NEW",
	UpdatedOld = "UPDATED_OLD",
}

export interface UpdateItemProps {
	readonly expressionAttributeNames: Record<string, string>;
	readonly updateExpression: string;
	readonly expressionAttributeValues: Record<string, unknown>;
	readonly conditionExpression?: string;
	readonly returnValues?: ReturnValue;
}

export const updateItem = async <T = unknown>(
	tableName: string,
	id: string,
	{
		expressionAttributeNames,
		updateExpression,
		expressionAttributeValues,
		conditionExpression,
		returnValues,
	}: UpdateItemProps
): Promise<T | 0> => {
	const params: UpdateCommandInput = {
		TableName: tableName,
		Key: { id },
		ExpressionAttributeNames: expressionAttributeNames,
		UpdateExpression: updateExpression,
		ExpressionAttributeValues: expressionAttributeValues,
		ConditionExpression: conditionExpression,
		ReturnValues: returnValues || "NONE",
	};

	const { Attributes } = await client.send(new UpdateCommand(params));

	return returnValues?.length ? <T>Attributes : 0;
};
