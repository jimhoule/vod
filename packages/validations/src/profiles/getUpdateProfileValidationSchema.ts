import { z } from 'zod';

type UpdateProfileValidationSchemaErrorMessagesMap = {
	nameErrorMessage?: string;
};

export const getUpdateProfileValidationSchema = (
	errorMessagesMap: UpdateProfileValidationSchemaErrorMessagesMap = {},
) => {
	const { nameErrorMessage } = errorMessagesMap;

	return z.object({
		name: z.string({ error: (issue) => nameErrorMessage || issue.message }).optional(),
	});
};
