import { APIGatewayProxyEventV2WithJWTAuthorizer } from "aws-lambda";

//
//
//

export const getJwtClaims = (event: APIGatewayProxyEventV2WithJWTAuthorizer) =>
	event?.requestContext?.authorizer?.jwt?.claims;
