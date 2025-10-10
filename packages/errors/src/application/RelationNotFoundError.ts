import { ApplicationError } from './ApplicationError';

export class RelationNotFoundError extends ApplicationError {
	constructor(
		public context: ApplicationError['context'],
		public cause?: ApplicationError['cause'],
	) {
		super('RelationNotFoundError', context, 'Related parent entity does not exist', cause);
	}
}
