import { PresentationError } from '../PresentationError';

export class NotFoundError extends PresentationError {
	public status: number = 404;

	constructor(
		public context: PresentationError['context'],
		public cause?: PresentationError['cause'],
	) {
		super(404, context, 'Entity does not exist', cause);
	}
}
