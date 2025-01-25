import type { ContentfulStatusCode } from 'hono/utils/http-status';

export type StatusCode = ContentfulStatusCode;

export class AppError extends Error {
    constructor(
        public readonly message: string,
        public readonly statusCode: StatusCode,
    ) {
        super(message);
    }
}
