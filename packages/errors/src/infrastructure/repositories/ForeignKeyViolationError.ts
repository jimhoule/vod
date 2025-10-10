import { InfrastructureError } from '../InfrastructureError';

export class ForeignKeyViolationError extends InfrastructureError {
	public description: string =
		'Violates a foreign key constraint, often by trying to reference a non-existent primary key or deleting a referenced primary key';

	constructor(
		public message: InfrastructureError['message'],
		public context: InfrastructureError['context'],
	) {
		super(context, message);
		super.name = 'ForeignKeyViolationError';
	}
}
