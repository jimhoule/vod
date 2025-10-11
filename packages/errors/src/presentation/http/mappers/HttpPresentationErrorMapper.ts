import { ApplicationError } from '../../../application/ApplicationError';
import { DuplicationError } from '../../../application/DuplicationError';
import { InvalidCredentialsError } from '../../../application/InvalidCredentialsError';
import { RelationNotFoundError } from '../../../application/RelationNotFoundError';
import { HttpError } from '../HttpError';
import { BadRequestError } from '../BadRequestError';
import { InternalServerError } from '../InternalServerError';

export class HttpPresentationErrorMapper {
	toPresentationError(
		context: HttpError['context'],
		applicationError: ApplicationError,
	): HttpError {
		switch (applicationError.name) {
			case DuplicationError.name:
				return new BadRequestError(context, 'Duplication not allowed', applicationError);

			case InvalidCredentialsError.name:
				return new BadRequestError(context, 'Invalid credentials', applicationError);

			case RelationNotFoundError.name:
				return new BadRequestError(context, 'Invalid parent relation', applicationError);

			default:
				return new InternalServerError(context, 'Internal Server Error', applicationError);
		}
	}
}
