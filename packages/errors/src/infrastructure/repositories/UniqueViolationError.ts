import { InfrastructureError } from '../InfrastructureError';

export class UniqueViolationError extends InfrastructureError {
	public description: string =
		'Attempts to insert a duplicate value into a column or set of columns with a UNIQUE constraint';

	constructor(
		public context: InfrastructureError['context'],
		public message: InfrastructureError['message'],
	) {
		super('UniqueViolationError', context, message);
	}
}
