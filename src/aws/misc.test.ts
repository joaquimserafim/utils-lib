import { APIGatewayProxyEventV2WithJWTAuthorizer } from "aws-lambda";

import { apigateway } from "../../mocks/index";
import { getJwtClaims } from "./misc";

//
//
//

const event: APIGatewayProxyEventV2WithJWTAuthorizer = {
	...apigateway.event,
	requestContext: {
		...apigateway.event.requestContext,
		authorizer: {
			jwt: {
				claims: {
					auth_time: "1660682075",
					client_id: "70gb8m4hqo2lo4nm4ljabjl34aas",
					exp: "1660685675",
					iat: "1660682075",
					iss: "https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_HmoasZtE",
					jti: "21943fc1-a668-496c-9ef2-fbeb880c44e8",
					scope: "phone openid email",
					sub: "xpto123",
					token_use: "access",
					username: "foo*bar",
					version: "2",
				},
				scopes: ["xpto123"],
			},
			principalId: "",
			integrationLatency: 60000,
		},
	},
};

describe("testing misc fns", () => {
	describe("testing getJwtClaims", () => {
		test("should return a valid `sub` property", () => {
			expect.hasAssertions();
			expect(getJwtClaims(event).sub).toBe("xpto123");
		});

		test("should return a valid `sub` property", () => {
			expect.hasAssertions();
			expect(
				getJwtClaims({} as APIGatewayProxyEventV2WithJWTAuthorizer)?.sub
			).toBe(undefined);
		});
	});
});
