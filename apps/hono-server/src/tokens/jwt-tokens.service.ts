import { sign, decode } from 'hono/jwt';
import type { JWTPayload } from 'hono/utils/jwt/types';
import type { TokensService } from './tokens.service.js';

export class JwtTokensService implements TokensService {
    generateToken<TPayload>(payload: TPayload): Promise<string> {
        return sign(payload as JWTPayload, 'secret');
    }

    decodeToken<TPayload>(token: string): TPayload {
        const { payload } = decode(token);

        return payload as TPayload;
    }
}
