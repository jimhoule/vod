import { getEnvValidationSchema } from '@packages/validations/env/getEnvValidationSchema';

const load = () => {
	const envValidationSchema = getEnvValidationSchema();

	return envValidationSchema.parse(process.env);
};

export const env = load();
