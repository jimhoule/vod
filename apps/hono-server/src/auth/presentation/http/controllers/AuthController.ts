import { PresentationError } from '@packages/errors/presentation/PresentationError';
import { getLoginValidationSchema } from '@packages/validations/auth/getLoginValidationSchema';
import { getRegisterValidationSchema } from '@packages/validations/auth/getRegisterValidationSchema';
import { createHandlers } from '@app/app.factory';
import { validateZodSchema } from '@app/middlewares/validateZodSchema';
import { AuthService } from '@auth/application/services/AuthService';
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	login() {
		const loginValidationSchema = getLoginValidationSchema({
			emailErrorMessage: '* Invalid email',
			passwordErrorMessage: '* Invalid password',
		});

		return createHandlers(validateZodSchema('json', loginValidationSchema), async (c) => {
			// Validates request body
			const loginDto = c.req.valid('json');
			// Gets access token
			const [accessToken, error] = await this.authService.login(loginDto);
			if (error) {
				const presentationError = new PresentationError(
					400,
					'AuthController/login',
					'',
					error,
				);

				return c.json(presentationError, 400);
			}

			return c.json({ accessToken }, 200);
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
			// Validates request body
			const registerDto = c.req.valid('json');
			// Gets access token
			const [accessToken, error] = await this.authService.register(registerDto);
			if (error) {
				const presentationError = new PresentationError(
					400,
					'AuthController/register',
					'',
					error,
				);

				return c.json(presentationError, 400);
			}

			return c.json({ accessToken }, 201);
		});
	}
}
