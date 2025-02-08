import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { appConfigs } from './app/app.configs.js';
import { AppHttpError } from './app/app.http-error.js';
import { authRoutes } from './auth/auth.module.js';
import { moviesRoutes } from './movies/movies.module.js';
import { profilesRoutes } from './profiles/profiles.module.js';
import { usersRoutes } from './users/users.module.js';

export const app = new Hono()
	.use(cors({ origin: appConfigs.http.allowed_origins }))
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

const port = appConfigs.http.port;
console.log(`Server is running on http://localhost:${port}`);

serve({
	fetch: app.fetch,
	port,
});

export type HonoServerType = typeof app;
