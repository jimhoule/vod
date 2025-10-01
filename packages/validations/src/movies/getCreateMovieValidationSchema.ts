import { z } from 'zod';

type CreateMovieValidationSchemaErrorMessagesMap = {
	titleErrorMessage?: string;
	descriptionErrorMessage?: string;
};

export const getCreateMovieValidationSchema = (
	errorMessagesMap: CreateMovieValidationSchemaErrorMessagesMap = {},
) => {
	const { titleErrorMessage, descriptionErrorMessage } = errorMessagesMap;

	return z.object({
		title: z.string({ error: (issue) => titleErrorMessage || issue.message }).default(''),
		description: z
			.string({ error: (issue) => descriptionErrorMessage || issue.message })
			.default(''),
	});
};
