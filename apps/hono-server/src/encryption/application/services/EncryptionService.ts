import type { ComparePasswordPayload } from '@encryption/application/services/payloads/ComparePasswordPayload';
import type { HashPasswordPayload } from '@encryption/application/services/payloads/HashPasswordPayload';
import type { EncryptionProvider } from '@encryption/infrastructure/providers/EncryptionProvider';

export class EncryptionService {
	constructor(private readonly encryptionProvider: EncryptionProvider) {}

	hashPassword(hashPasswordPayload: HashPasswordPayload): Promise<string> {
		return this.encryptionProvider.hashPassword(hashPasswordPayload.password);
	}

	comparePassword(comparePasswordPayload: ComparePasswordPayload): Promise<boolean> {
		return this.encryptionProvider.comparePassword(
			comparePasswordPayload.password,
			comparePasswordPayload.hashedPassword,
		);
	}
}
