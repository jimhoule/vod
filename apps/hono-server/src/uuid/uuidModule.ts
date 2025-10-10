import { ApplicationErrorMapper } from '@packages/errors/application/mappers/ApplicationErrorMapper';
import { UuidService } from '@uuid/application/services/UuidService';
import { CryptoUuidProvider } from '@uuid/infrastructure/providers/CryptoUuidProvider';

export const uuidService = new UuidService(new ApplicationErrorMapper(), new CryptoUuidProvider());
