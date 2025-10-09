import { randomUUID } from 'node:crypto';
import type { UuidProvider } from '@uuid/infrastructure/providers/UuidProvider';

export class CryptoUuidProvider implements UuidProvider {
	generate(): string {
		return randomUUID();
	}
}
