import type { Either } from './types/Either';

export const async = async <TData, TError = Error>(
	promise: Promise<TData>,
): Promise<Either<TData, TError>> => {
	try {
		const data = await promise;

		return [data, null];
	} catch (error) {
		return [null, error as TError];
	}
};
