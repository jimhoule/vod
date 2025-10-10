import type { Either } from './types/Either';

export const async = async <TData, TError = Error>(
	promise: Promise<TData>,
): Promise<Either<TData, TError>> => {
	try {
		const data = await promise;

		return [data, null] as const;
	} catch (error) {
		return [null, error as TError] as const;
	}
};
