import type { Either } from '@packages/core/types/Either';
import { ApplicationError } from '@packages/errors/application/ApplicationError';
import type { DecodeTokenPayload } from '@tokens/application/services/payloads/DecodeTokenPayload';
import type { GenerateTokenPayload } from '@tokens/application/services/payloads/GenerateTokenPayload';
import type { VerifyTokenPayload } from '@tokens/application/services/payloads/VerifyTokenPayload';
import type { TokensProvider } from '@tokens/infrastructure/providers/TokensProvider';

export class TokensService {
	constructor(private readonly tokensProvider: TokensProvider) {}

	async generate<TPayload>(
		generateTokenPayload: GenerateTokenPayload<TPayload>,
	): Promise<Either<string, ApplicationError>> {
		const [token, error] = await this.tokensProvider.generate<TPayload>(
			generateTokenPayload.payload,
		);
		if (error) {
			const applicationError = new ApplicationError(
				'TokensService/generate',
				error.message,
				error,
			);
			return [null, applicationError];
		}

		return [token, null];
	}

	decode<TPayload>(decodeTokenPayload: DecodeTokenPayload): Either<TPayload, ApplicationError> {
		const [payload, error] = this.tokensProvider.decode<TPayload>(decodeTokenPayload.token);
		if (error) {
			const applicationError = new ApplicationError(
				'TokensService/decode',
				error.message,
				error,
			);
			return [null, applicationError];
		}

		return [payload, null];
	}

	verify(verifyTokenPayload: VerifyTokenPayload): Either<boolean, ApplicationError> {
		const [payload, error] = this.tokensProvider.decode(verifyTokenPayload.token);
		if (error) {
			const applicationError = new ApplicationError(
				'TokensService/verify',
				error.message,
				error,
			);
			return [null, applicationError];
		}

		return [!!payload, null];
	}
}
