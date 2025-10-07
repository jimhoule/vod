export class BaseError {
	constructor(
		public name: string,
		public context: string,
		public layer: string,
		public message: string,
		public cause?: BaseError,
	) {}

	toJson() {
		return {
			name: this.name,
			context: this.context,
			layer: this.layer,
			message: this.message,
			cause: this.cause,
		};
	}
}
