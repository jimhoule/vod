import { BaseError } from '../BaseError';

export class InfrastructureError extends BaseError {
	constructor(
		public context: BaseError['context'],
		public message: BaseError['message'],
	) {
		super('InfrastructureError', context, 'infrastructure', message);
	}
}
