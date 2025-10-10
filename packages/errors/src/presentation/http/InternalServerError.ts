import { HttpError } from './HttpError';

export class InternalServerError extends HttpError {
	constructor(
		public context: HttpError['context'],
		public message: HttpError['message'],
		public cause?: HttpError['cause'],
	) {
		super(500, context, message, cause);
	}
}
