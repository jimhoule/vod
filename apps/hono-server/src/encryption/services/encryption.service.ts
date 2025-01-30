export interface EncryptionService {
	hashPassword(password: string): Promise<string>;
	comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}
