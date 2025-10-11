import { ApplicationError } from './ApplicationError';

export class InvalidCredentialsError extends ApplicationError {
	constructor(
		public context: ApplicationError['context'],
		public cause?: ApplicationError['cause'],
	) {
		super('InvalidCredentialsError', context, 'Invalid Credentials', cause);
	}
}
