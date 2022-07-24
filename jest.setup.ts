//
// set some env for tests
//

process.env.STAGE = process.env.STAGE ?? "Test";
process.env.AWS_REGION = process.env.AWS_REGION ?? "local";
process.env.AWS_ACCOUNT_ID = process.env.AWS_ACCOUNT_ID ?? "test_acount";

//
// lets silence the stdout for testing purposes
//

if (process.env.NO_LOG === "true") {
	jest.spyOn(process.stdout, "write").mockImplementation(() => true);
}
