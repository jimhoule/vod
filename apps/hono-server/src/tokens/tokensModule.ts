import { ApplicationErrorMapper } from '@packages/errors/application/mappers/ApplicationErrorMapper';
import { TokensService } from '@tokens/application/services/TokensService';
import { JwtTokensProvider } from '@tokens/infrastructure/providers/JwtTokensProvider';

export const tokensService = new TokensService(
	new ApplicationErrorMapper(),
	new JwtTokensProvider(),
);
