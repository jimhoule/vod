import { bearerAuth } from 'hono/bearer-auth';
import { createMiddleware } from '@app/app.factory';
import { tokensService } from '@tokens/tokensModule';

export const isAuthenticated = createMiddleware((c, next) => {
	const token = c.req.header('Authorization') as string;
	const bearer = bearerAuth({
		token,
		verifyToken: (token) => {
			return tokensService.verify({ token });
		},
	});

	return bearer(c, next);
});
