import { InfrastructureError } from '../InfrastructureError';

export class UniqueViolationError extends InfrastructureError {
	constructor(
		public message: InfrastructureError['message'],
		public context: InfrastructureError['context'],
	) {
		super(context, message);
		super.name = 'UniqueViolationError';
	}

	toJson() {
		const { name, ...rest } = super.toJson();

		return {
			name,
			description:
				'Attempts to insert a duplicate value into a column or set of columns with a UNIQUE constraint',
			...rest,
		};
	}
}
