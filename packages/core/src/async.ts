export type AsyncSuccess<TData> = [data: TData, error: null];
export type AsycFailure<TError> = [data: null, error: TError];
export type AsyncResult<TData, TError> = AsyncSuccess<TData> | AsycFailure<TError>;

export const async = async <TData, TError = Error>(
	promise: Promise<TData>,
): Promise<AsyncResult<TData, TError>> => {
	try {
		const data = await promise;

		return [data, null];
	} catch (error) {
		return [null, error as TError];
	}
};
