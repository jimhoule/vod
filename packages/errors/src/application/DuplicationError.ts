import { ApplicationError } from './ApplicationError';

export class DuplicationError extends ApplicationError {
	constructor(
		public context: ApplicationError['context'],
		public cause?: ApplicationError['cause'],
	) {
		super('DuplicationError', context, 'Execution caused duplication of data', cause);
	}
}
