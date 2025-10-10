import type { Either } from './types/Either';

export const sync = <TData, TError = Error>(func: () => TData): Either<TData, TError> => {
	try {
		const data = func();

		return [data, null];
	} catch (error) {
		return [null, error as TError];
	}
};
