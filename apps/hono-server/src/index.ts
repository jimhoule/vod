import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { serve } from '@hono/node-server';
import { authRoutes } from './auth/auth.module.js';
import { configs } from './configs.js';
import { usersRoutes } from './users/users.module.js';

export const app = new Hono()
    .route('/', authRoutes)
    .route('/', usersRoutes)
    .onError((err, c) => {
        // Gets HTTPException the custom response
        if (err instanceof HTTPException) {
            return err.getResponse();
        }

        return c.json(err);
    });

const port = configs.app.port;
console.log(`Server is running on http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port,
});

export type HoneServerType = typeof app;
