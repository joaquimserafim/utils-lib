import { APIGatewayProxyEventV2WithJWTAuthorizer } from "aws-lambda";

//
//
//

export const getUserId = (event: APIGatewayProxyEventV2WithJWTAuthorizer) =>
	event?.requestContext?.authorizer?.jwt?.claims?.sub;
