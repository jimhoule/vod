export class BaseError {
	constructor(
		public name: string,
		public context: string,
		public layer: string,
		public message: string,
		public cause?: BaseError,
	) {}
}
