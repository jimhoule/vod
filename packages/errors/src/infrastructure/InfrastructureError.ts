import { BaseError } from '../BaseError';

export class InfrastructureError extends BaseError {
	constructor(
		public name: BaseError['name'],
		public context: BaseError['context'],
		public message: BaseError['message'],
	) {
		super(name, context, 'infrastructure', message);
	}
}
