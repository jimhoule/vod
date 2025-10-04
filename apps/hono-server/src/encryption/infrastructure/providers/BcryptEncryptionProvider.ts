import { hash, compare } from 'bcrypt';
import type { EncryptionProvider } from '@encryption/infrastructure/providers/EncryptionProvider';

export class BcryptEncryptionProvider implements EncryptionProvider {
	hashPassword(password: string): Promise<string> {
		return hash(password, 10);
	}

	comparePassword(password: string, hashedPassword: string): Promise<boolean> {
		return compare(hashedPassword, password);
	}
}
