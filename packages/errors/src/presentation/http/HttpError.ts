import { PresentationError } from '../PresentationError';

export class HttpError extends PresentationError {
	constructor(
		public status: number,
		public context: PresentationError['context'],
		public message: PresentationError['message'],
		public cause?: PresentationError['cause'],
	) {
		super(context, message, cause);
	}
}
