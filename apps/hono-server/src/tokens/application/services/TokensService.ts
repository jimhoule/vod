import type { Either } from '@packages/core/types/Either';
import type { ApplicationError } from '@packages/errors/application/ApplicationError';
import type { ApplicationErrorMapper } from '@packages/errors/application/mappers/ApplicationErrorMapper';
import type { DecodeTokenPayload } from '@tokens/application/services/payloads/DecodeTokenPayload';
import type { GenerateTokenPayload } from '@tokens/application/services/payloads/GenerateTokenPayload';
import type { VerifyTokenPayload } from '@tokens/application/services/payloads/VerifyTokenPayload';
import type { TokensProvider } from '@tokens/infrastructure/providers/TokensProvider';

export class TokensService {
	constructor(
		private readonly applicationErrorMapper: ApplicationErrorMapper,
		private readonly tokensProvider: TokensProvider,
	) {}

	async generate<TPayload>(
		generateTokenPayload: GenerateTokenPayload<TPayload>,
	): Promise<Either<string, ApplicationError>> {
		const [token, error] = await this.tokensProvider.generate<TPayload>(
			generateTokenPayload.payload,
		);
		if (error) {
			const applicationError = this.applicationErrorMapper.toApplicationError(
				'TokensService/generate',
				error,
			);
			return [null, applicationError];
		}

		return [token, null];
	}

	decode<TPayload>(decodeTokenPayload: DecodeTokenPayload): Either<TPayload, ApplicationError> {
		const [payload, error] = this.tokensProvider.decode<TPayload>(decodeTokenPayload.token);
		if (error) {
			const applicationError = this.applicationErrorMapper.toApplicationError(
				'TokensService/decode',
				error,
			);
			return [null, applicationError];
		}

		return [payload, null];
	}

	verify(verifyTokenPayload: VerifyTokenPayload): Either<boolean, ApplicationError> {
		const [payload, error] = this.tokensProvider.decode(verifyTokenPayload.token);
		if (error) {
			const applicationError = this.applicationErrorMapper.toApplicationError(
				'TokensService/verify',
				error,
			);
			return [null, applicationError];
		}

		return [!!payload, null];
	}
}
