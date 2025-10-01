import { hash, compare } from 'bcrypt';
import type { EncryptionService } from './encryption.service';

export class BcryptEncryptionService implements EncryptionService {
	hashPassword(password: string): Promise<string> {
		return hash(password, 10);
	}

	comparePassword(password: string, hashedPassword: string): Promise<boolean> {
		return compare(hashedPassword, password);
	}
}
