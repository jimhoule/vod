import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { env } from '@packages/env';
import { AppHttpError } from '@app/app.http-error';
import { authRoutes } from '@auth/auth.module';
import { moviesRoutes } from '@movies/movies.module';
import { profilesRoutes } from '@profiles/profiles.module';
import { usersRoutes } from '@users/users.module';

export const app = new Hono()
	.use(cors({ origin: env.HTTP_ALLOWED_ORIGINS }))
	.route('/', authRoutes)
	.route('/', moviesRoutes)
	.route('/', profilesRoutes)
	.route('/', usersRoutes)
	.onError((err, c) => {
		// Gets AppHttpError the custom response
		if (err instanceof AppHttpError) {
			return err.getResponse();
		}

		return c.json(err);
	});

const port = env.HTTP_PORT;
console.log(`Server is running on http://localhost:${port}`);

serve({
	fetch: app.fetch,
	port,
});

export type HonoServerType = typeof app;
