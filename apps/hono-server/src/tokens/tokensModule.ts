import { TokensService } from '@tokens/application/services/TokensService';
import { JwtTokensProvider } from '@tokens/infrastructure/providers/JwtTokensProvider';

export const tokensService = new TokensService(new JwtTokensProvider());
