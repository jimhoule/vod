import 'dotenv/config';
import { z } from 'zod';

const processEnvSchema = z.object({
	HTTP_PORT: z
		.string()
		.refine((val) => !isNaN(parseInt(val)))
		.transform((val) => parseInt(val)),
	DB_URL: z.string(),
	JWT_SECRET: z.string(),
});

const load = () => {
	const parsedProcessEnv = processEnvSchema.parse(process.env);

	return {
		http: {
			port: parsedProcessEnv.HTTP_PORT,
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
