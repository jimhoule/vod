import { UuidService } from '@uuid/application/services/UuidService';
import { CryptoUuidProvider } from '@uuid/infrastructure/providers/CryptoUuidProvider';

export const uuidService = new UuidService(new CryptoUuidProvider());
