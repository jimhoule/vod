import { BaseError } from '../BaseError';

export class ApplicationError extends BaseError {
	constructor(
		public context: BaseError['context'],
		public message: BaseError['message'],
		public cause?: BaseError['cause'],
	) {
		super('ApplicationError', context, 'application', message, cause);
	}
}
