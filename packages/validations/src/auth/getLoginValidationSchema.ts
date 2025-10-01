import { z } from 'zod';
import { getEmailValidationSchema } from '../common/getEmailValidationSchema';

type LoginValidationSchemaErrorMessagesMap = {
	emailErrorMessage?: string;
	passwordErrorMessage?: string;
};

export const getLoginValidationSchema = (
	errorMessagesMap: LoginValidationSchemaErrorMessagesMap = {},
) => {
	const { emailErrorMessage, passwordErrorMessage } = errorMessagesMap;

	const emailValidationSchema = getEmailValidationSchema(emailErrorMessage);

	return z.object({
		...emailValidationSchema.shape,
		password: z
			.string()
			.min(1, { error: (issue) => passwordErrorMessage || issue.message })
			.default(''),
	});
};
