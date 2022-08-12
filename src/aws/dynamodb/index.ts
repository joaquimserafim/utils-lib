import { client } from "./client";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import {
	GetCommand,
	GetCommandInput,
	QueryCommand,
	QueryCommandInput,
	UpdateCommand,
	UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { ReturnValue } from "@aws-sdk/client-dynamodb";

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
	readonly projectionExpression?: string;
}

export const query = async <T = undefined>(
	tableName: string,
	{
		keyConditionExpression,
		expressionAttributeNames,
		expressionAttributeValues,
		filterExpression,
		projectionExpression,
	}: QueryProps
): Promise<T[]> => {
	const params: QueryCommandInput = {
		TableName: tableName,
		ExpressionAttributeNames: expressionAttributeNames,
		ExpressionAttributeValues: expressionAttributeValues,
		KeyConditionExpression: keyConditionExpression,
		FilterExpression: filterExpression,
		ProjectionExpression: projectionExpression,
	};

	const { Items } = await client.send(new QueryCommand(params));

	return Items as T[];
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
