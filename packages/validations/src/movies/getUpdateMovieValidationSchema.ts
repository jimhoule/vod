import { z } from 'zod';

type UpdateMovieValidationSchemaErrorMessagesMap = {
	titleErrorMessage: string;
	descriptionErrorMessage: string;
};

export const getUpdateMovieValidationSchema = (
	errorMessagesMap: UpdateMovieValidationSchemaErrorMessagesMap,
) => {
	const { titleErrorMessage, descriptionErrorMessage } = errorMessagesMap;

	return z.object({
		title: z.string({ error: (issue) => titleErrorMessage || issue.message }).optional(),
		description: z
			.string({ error: (issue) => descriptionErrorMessage || issue.message })
			.optional(),
	});
};
