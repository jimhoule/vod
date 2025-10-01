import { z } from 'zod';

export const getIdValidationSchema = (idErrorMessage?: string) => {
	return z.object({
		id: z.uuid({ error: (issue) => idErrorMessage || issue.message }).default(''),
	});
};
