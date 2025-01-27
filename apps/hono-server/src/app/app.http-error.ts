import { HTTPException } from 'hono/http-exception';
import { AppError, type StatusCode } from './app.error.js';

export class AppHttpError extends HTTPException {
    constructor(statusCode: StatusCode, message: string, cause?: unknown) {
        super(statusCode, { message, cause });
    }
}

export const throwHttpError = (err: unknown): never => {
    if (err instanceof AppHttpError) {
        throw err;
    }

    if (err instanceof AppError) {
        throw new AppHttpError(err.statusCode, err.message);
    }

    throw new AppHttpError(500, '', err);
};
