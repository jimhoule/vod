import { InfrastructureError } from '../InfrastructureError';

export class UniqueViolationError extends InfrastructureError {
	public description: string =
		'Attempts to insert a duplicate value into a column or set of columns with a UNIQUE constraint';

	constructor(
		public message: InfrastructureError['message'],
		public context: InfrastructureError['context'],
	) {
		super(context, message);
		super.name = 'UniqueViolationError';
	}
}
