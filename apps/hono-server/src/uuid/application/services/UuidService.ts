import type { UuidProvider } from '@uuid/infrastructure/providers/UuidProvider';

export class UuidService {
	constructor(private readonly uuidProvider: UuidProvider) {}

	generate(): string {
		return this.uuidProvider.generate();
	}
}
