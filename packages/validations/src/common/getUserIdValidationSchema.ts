import { z } from 'zod';
import { getIdValidationSchema } from './getIdValidationSchema';

export const getUserIdValidationSchema = (userIdErrorMessage?: string) => {
	const idValidationSchema = getIdValidationSchema(userIdErrorMessage);

	return z.object({
		userId: idValidationSchema.shape.id,
	});
};
