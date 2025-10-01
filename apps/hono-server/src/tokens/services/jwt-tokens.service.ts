import { sign, decode } from 'hono/jwt';
import type { JWTPayload } from 'hono/utils/jwt/types';
import { env } from '@packages/env';
import type { TokensService } from './tokens.service';

export class JwtTokensService implements TokensService {
	generate<TPayload>(payload: TPayload): Promise<string> {
		return sign(payload as JWTPayload, env.JWT_SECRET);
	}

	decode<TPayload>(token: string): TPayload {
		const { payload } = decode(token);

		return payload as TPayload;
	}

	verify(token: string): boolean {
		return !!this.decode(token);
	}
}
