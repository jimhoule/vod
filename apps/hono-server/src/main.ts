import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { env } from '@packages/env';
import { authRoutes } from '@auth/authModule';
import { moviesRoutes } from '@movies/moviesModule';
import { profilesRoutes } from '@profiles/profilesModule';
import { usersRoutes } from '@users/usersModule';

export const app = new Hono()
	.use(cors({ origin: env.HTTP_ALLOWED_ORIGINS }))
	.route('/', authRoutes)
	.route('/', moviesRoutes)
	.route('/', profilesRoutes)
	.route('/', usersRoutes)
	.onError((err, c) => c.json(err));

const port = env.HTTP_PORT;
console.log(`Server is running on http://localhost:${port}`);

serve({
	fetch: app.fetch,
	port,
});

export type HonoServerType = typeof app;
