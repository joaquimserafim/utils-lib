//
//
//

export const thrower = (error: string) => (): Error => {
	throw new Error(error);
};
