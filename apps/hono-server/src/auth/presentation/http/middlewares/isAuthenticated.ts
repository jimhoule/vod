import { bearerAuth } from 'hono/bearer-auth';
import { createMiddleware } from '@app/app.factory';
import { tokensService } from '@tokens/tokensModule';

export const isAuthenticated = createMiddleware((c, next) => {
	const token = c.req.header('Authorization') as string;
	const bearer = bearerAuth({
		token,
		verifyToken: (token) => {
			const [isValid] = tokensService.verify({ token });

			return !!isValid;
		},
	});

	return bearer(c, next);
});
