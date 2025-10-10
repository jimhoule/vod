import { HttpError } from './HttpError';

export class ForbiddenError extends HttpError {
	constructor(
		public context: HttpError['context'],
		public message: HttpError['message'],
		public cause?: HttpError['cause'],
	) {
		super(403, context, message, cause);
	}
}
