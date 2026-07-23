import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const baseClient = new DynamoDBClient({
  endpoint: process.env.DYNAMODB_ENDPOINT,
});

export const ddb = DynamoDBDocumentClient.from(baseClient, {
  marshallOptions: { removeUndefinedValues: true },
});

export const ELEMENTOS_TABLE = process.env.ELEMENTOS_TABLE ?? "calli-elementos";
export const GRUPOS_TABLE = process.env.GRUPOS_TABLE ?? "calli-grupos";
