import { BaseError } from '../BaseError';

export class ApplicationError extends BaseError {
	constructor(
		public name: BaseError['name'],
		public context: BaseError['context'],
		public message: BaseError['message'],
		public cause?: BaseError['cause'],
	) {
		super(name, context, 'application', message, cause);
	}
}
