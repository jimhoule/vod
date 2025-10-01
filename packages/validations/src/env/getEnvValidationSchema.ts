import { z } from 'zod';

export const getEnvValidationSchema = () => {
	return z.object({
		DB_URL: z.string(),

		HTTP_PORT: z
			.string()
			.refine((value) => !isNaN(parseInt(value)))
			.transform((value) => parseInt(value)),
		HTTP_ALLOWED_ORIGINS: z.string().transform((value) => value.split(',')),

		JWT_SECRET: z.string(),
	});
};
