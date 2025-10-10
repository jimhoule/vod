import { sign, decode } from 'hono/jwt';
import type { JWTPayload } from 'hono/utils/jwt/types';
import { async } from '@packages/core/async';
import { sync } from '@packages/core/sync';
import type { Either } from '@packages/core/types/Either';
import { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';
import { env } from '@packages/env';
import type { TokensProvider } from '@tokens/infrastructure/providers/TokensProvider';

export class JwtTokensProvider implements TokensProvider {
	async generate<TPayload>(payload: TPayload): Promise<Either<string, InfrastructureError>> {
		const [jwtToken, error] = await async(sign(payload as JWTPayload, env.JWT_SECRET));
		if (error) {
			const infrastructureError = new InfrastructureError(
				'JwtTokensProvider/generate',
				'Error generating jwt token',
			);
			return [null, infrastructureError];
		}

		return [jwtToken, null];
	}

	decode<TPayload>(token: string): Either<TPayload, InfrastructureError> {
		const [payload, error] = sync(() => {
			const { payload } = decode(token);
			return payload as TPayload;
		});
		if (error) {
			const infrastructureError = new InfrastructureError(
				'JwtTokensProvider/generate',
				'Error generating jwt token',
			);
			return [null, infrastructureError];
		}

		return [payload as TPayload, null];
	}
}
