import type { Failure } from './Failure';
import type { Success } from './Success';

export type Either<TData, TError> = Success<TData> | Failure<TError>;
