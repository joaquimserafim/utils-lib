//
//
//

const API = process.env.API || "api";
const VERSION = process.env.VERSION || "1.0.0";
const ENV = process.env.ENV || "prod";

//
// a very very small lib
// to print logs to cloudwatch
//

export interface LogProps {
	info(entry: unknown): boolean;
	error(entry: unknown): boolean;
}

export const log =
	(origin: string) =>
	(id: { [key: string]: string }): LogProps => {
		const print = (type: string) => (entry: unknown) =>
			process.stdout.write(
				`{"api":"${API}","${Object.keys(id)[0]}":"${
					Object.values(id)[0]
				}","entry":${JSON.stringify(
					entry
				)},"origin":"${origin}","stage":"${ENV}","timestamp":"${new Date().toISOString()}","type":"${type}","version":"${VERSION}"}\n`
			);

		return {
			info: print("info"),
			error: print("error"),
		};
	};
