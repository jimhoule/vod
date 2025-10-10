import { ApplicationErrorMapper } from '@packages/errors/application/mappers/ApplicationErrorMapper';
import { EncryptionService } from '@encryption/application/services/EncryptionService';
import { BcryptEncryptionProvider } from '@encryption/infrastructure/providers/BcryptEncryptionProvider';

export const encryptionService = new EncryptionService(
	new ApplicationErrorMapper(),
	new BcryptEncryptionProvider(),
);
