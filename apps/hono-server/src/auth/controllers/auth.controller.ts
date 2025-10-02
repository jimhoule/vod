import { getLoginValidationSchema } from '@packages/validations/auth/getLoginValidationSchema';
import { getRegisterValidationSchema } from '@packages/validations/auth/getRegisterValidationSchema';
import { createHandlers } from '@app/app.factory';
import { throwHttpError } from '@app/app.http-error';
import { validateZodSchema } from '@app/middlewares/validate-zod-schema.middleware';
import { AuthService } from '@auth/services/auth.service';
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	login() {
		const loginValidationSchema = getLoginValidationSchema({
			emailErrorMessage: '* Invalid email',
			passwordErrorMessage: '* Invalid password',
		});

		return createHandlers(validateZodSchema('json', loginValidationSchema), async (c) => {
			try {
				// Validates request body
				const loginDto = c.req.valid('json');
				// Gets access token
				const accessToken = await this.authService.login(loginDto);

				return c.json({ accessToken }, 200);
			} catch (err) {
				throwHttpError(err);
			}
		});
	}

	register() {
		const registerValidationSchema = getRegisterValidationSchema({
			emailErrorMessage: '* Invalid email',
			firstNameErrorMessage: '* Invalid first name',
			lastNameErrorMessage: '* Invalid last name',
			passwordErrorMessage: '* Invalid password',
		});

		return createHandlers(validateZodSchema('json', registerValidationSchema), async (c) => {
			try {
				// Validates request body
				const registerDto = c.req.valid('json');
				// Gets access token
				const accessToken = await this.authService.register(registerDto);

				return c.json({ accessToken }, 201);
			} catch (err) {
				throwHttpError(err);
			}
		});
	}
}
