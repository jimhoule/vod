import { z } from 'zod';

export const getNameValidationSchema = (nameErrorMessage?: string) => {
	return z.object({
		name: z
			.string()
			.regex(/^[a-zA-Z,.'-]+$/, { error: (issue) => nameErrorMessage || issue.message })
			.default(''),
	});
};
