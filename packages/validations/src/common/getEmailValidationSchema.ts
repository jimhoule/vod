import { z } from 'zod';

export const getEmailValidationSchema = (emailErrorMessage?: string) => {
	return z.object({
		email: z.email({ error: (issue) => emailErrorMessage || issue.message }).default(''),
	});
};
