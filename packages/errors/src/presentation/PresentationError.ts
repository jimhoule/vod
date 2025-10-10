import { BaseError } from '../BaseError';

export class PresentationError extends BaseError {
	constructor(
		public status: number,
		public context: BaseError['context'],
		public message: BaseError['message'],
		public cause?: BaseError['cause'],
	) {
		super('PresentationError', context, 'presentation', message, cause);
	}
}
