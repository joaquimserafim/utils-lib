import got, { ExtendOptions, Got } from "got";

//
//
//

export const request = (...config: Array<Got | ExtendOptions>) => {
	const options = {
		timeout: {
			request: 10000,
		},
		retry: {
			limit: 0,
		},
	};

	const client = got.extend({ ...options, ...config });

	return client;
};
