import { createFactory } from 'hono/factory';

const appFactory = createFactory();

export const createHandlers = appFactory.createHandlers;
export const createMiddleware = appFactory.createMiddleware;
