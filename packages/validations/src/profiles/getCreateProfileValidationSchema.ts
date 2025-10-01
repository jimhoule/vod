import { z } from 'zod';
import { getUserIdValidationSchema } from '../common/getUserIdValidationSchema';

type CreateProfileValidationSchemaErrorMessagesMap = {
	nameErrorMessage?: string;
	userIdErrorMessage?: string;
};

export const getCreateProfileValidationSchema = (
	errorMessagesMap: CreateProfileValidationSchemaErrorMessagesMap = {},
) => {
	const { nameErrorMessage, userIdErrorMessage } = errorMessagesMap;

	const userIdValidationSchema = getUserIdValidationSchema(userIdErrorMessage);

	return z.object({
		...userIdValidationSchema.shape,
		name: z.string({ error: (issue) => nameErrorMessage || issue.message }).default(''),
	});
};
