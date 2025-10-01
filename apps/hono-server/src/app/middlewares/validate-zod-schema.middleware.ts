import type { ValidationTargets } from 'hono';
import { zValidator as zv } from '@hono/zod-validator';
import type { ZodType } from 'zod';

export const validateZodSchema = <TTarget extends keyof ValidationTargets, TSchema extends ZodType>(
	target: TTarget,
	schema: TSchema,
) =>
	zv(target, schema, (result, c) => {
		if (!result.success) {
			const { error } = result;
			// NOTE: error.message is the stringified issues array
			const [{ message }] = JSON.parse(error.message);

			const json = {
				status: 400,
				error: {
					name: error.name,
					message,
				},
			};

			return c.json(json, 400);
		}
	});
