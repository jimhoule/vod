import { sign, decode } from 'hono/jwt';
import type { JWTPayload } from 'hono/utils/jwt/types';
import { env } from '@packages/env';
import type { TokensProvider } from '@tokens/infrastructure/providers/TokensProvider';

export class JwtTokensProvider implements TokensProvider {
	generate<TPayload>(payload: TPayload): Promise<string> {
		return sign(payload as JWTPayload, env.JWT_SECRET);
	}

	decode<TPayload>(token: string): TPayload {
		const { payload } = decode(token);

		return payload as TPayload;
	}
}
