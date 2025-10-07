import { InfrastructureError } from '../InfrastructureError';

export class ForeignKeyViolationError extends InfrastructureError {
	constructor(
		public message: InfrastructureError['message'],
		public context: InfrastructureError['context'],
	) {
		super(context, message);
		super.name = 'ForeignKeyViolationError';
	}

	toJson() {
		const { name, ...rest } = super.toJson();

		return {
			name,
			description:
				'Violates a foreign key constraint, often by trying to reference a non-existent primary key or deleting a referenced primary key',
			...rest,
		};
	}
}
