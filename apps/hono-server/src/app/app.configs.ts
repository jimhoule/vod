import 'dotenv/config';
import { z } from 'zod';

const processEnvSchema = z.object({
	HTTP_PORT: z
		.string()
		.refine((value) => !isNaN(parseInt(value)))
		.transform((value) => parseInt(value)),
	HTTP_ALLOWED_ORIGINS: z.string().transform((value) => value.split(',')),
	DB_URL: z.string(),
	JWT_SECRET: z.string(),
});

const load = () => {
	const parsedProcessEnv = processEnvSchema.parse(process.env);

	return {
		http: {
			port: parsedProcessEnv.HTTP_PORT,
			allowed_origins: parsedProcessEnv.HTTP_ALLOWED_ORIGINS,
		},
		db: {
			url: parsedProcessEnv.DB_URL,
		},
		jwt: {
			secret: parsedProcessEnv.JWT_SECRET,
		},
	};
};

export const appConfigs = load();
