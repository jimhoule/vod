import { HttpError } from './HttpError';

export class UnauthorizedError extends HttpError {
	constructor(
		public context: HttpError['context'],
		public message: HttpError['message'],
		public cause?: HttpError['cause'],
	) {
		super(401, context, message, cause);
	}
}
