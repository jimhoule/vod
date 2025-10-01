import { z } from 'zod';
import { getEmailValidationSchema } from '../common/getEmailValidationSchema';
import { getNameValidationSchema } from '../common/getNameValidationSchema';

type RegisterValidationSchemaErrorMessagesMap = {
	emailErrorMessage?: string;
	firstNameErrorMessage?: string;
	lastNameErrorMessage?: string;
	passwordErrorMessage?: string;
};

export const getRegisterValidationSchema = (
	errorMessagesMap: RegisterValidationSchemaErrorMessagesMap = {},
) => {
	const { firstNameErrorMessage, lastNameErrorMessage, emailErrorMessage, passwordErrorMessage } =
		errorMessagesMap;

	const emailValidationSchema = getEmailValidationSchema(emailErrorMessage);
	const firstNameValidationSchema = getNameValidationSchema(firstNameErrorMessage);
	const lastNameValidationSchema = getNameValidationSchema(lastNameErrorMessage);

	return z.object({
		...emailValidationSchema.shape,
		firstName: firstNameValidationSchema.shape.name,
		lastName: lastNameValidationSchema.shape.name,
		password: z
			.string()
			.min(8, { error: (issue) => passwordErrorMessage || issue.message })
			.default(''),
	});
};
