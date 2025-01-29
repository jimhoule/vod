import { sign, decode } from 'hono/jwt';
import type { JWTPayload } from 'hono/utils/jwt/types';
import { appConfigs } from '../app/app.configs.js';
import type { TokensService } from './tokens.service.js';

export class JwtTokensService implements TokensService {
	generate<TPayload>(payload: TPayload): Promise<string> {
		return sign(payload as JWTPayload, appConfigs.jwt.secret);
	}

	decode<TPayload>(token: string): TPayload {
		const { payload } = decode(token);

		return payload as TPayload;
	}

	verify(token: string): boolean {
		return !!this.decode(token);
	}
}
