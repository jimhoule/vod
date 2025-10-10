import { HttpError } from './HttpError';

export class BadRequestError extends HttpError {
	constructor(
		public context: HttpError['context'],
		public message: HttpError['message'],
		public cause?: HttpError['cause'],
	) {
		super(400, context, message, cause);
	}
}
