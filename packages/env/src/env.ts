import dotenvx from '@dotenvx/dotenvx';
import { getEnvValidationSchema } from '@packages/validations/env/getEnvValidationSchema';

dotenvx.config();

const load = () => {
	const envValidationSchema = getEnvValidationSchema();

	return envValidationSchema.parse(process.env);
};

export const env = load();
