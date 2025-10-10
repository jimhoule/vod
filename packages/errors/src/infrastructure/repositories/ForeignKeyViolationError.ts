import { InfrastructureError } from '../InfrastructureError';

export class ForeignKeyViolationError extends InfrastructureError {
	public description: string =
		'Violates a foreign key constraint, often by trying to reference a non-existent primary key or deleting a referenced primary key';

	constructor(
		public context: InfrastructureError['context'],
		public message: InfrastructureError['message'],
	) {
		super('ForeignKeyViolationError', context, message);
	}
}
