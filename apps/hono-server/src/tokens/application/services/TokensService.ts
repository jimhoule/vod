import type { DecodeTokenPayload } from '@tokens/application/services/payloads/DecodeTokenPayload';
import type { GenerateTokenPayload } from '@tokens/application/services/payloads/GenerateTokenPayload';
import type { VerifyTokenPayload } from '@tokens/application/services/payloads/VerifyTokenPayload';
import type { TokensProvider } from '@tokens/infrastructure/providers/TokensProvider';

export class TokensService {
	constructor(private readonly tokensProvider: TokensProvider) {}

	generate<TPayload>(generateTokenPayload: GenerateTokenPayload<TPayload>): Promise<string> {
		return this.tokensProvider.generate<TPayload>(generateTokenPayload.payload);
	}

	decode<TPayload>(decodeTokenPayload: DecodeTokenPayload): TPayload {
		return this.tokensProvider.decode<TPayload>(decodeTokenPayload.token);
	}

	verify(verifyTokenPayload: VerifyTokenPayload): boolean {
		return !!this.tokensProvider.decode(verifyTokenPayload.token);
	}
}
