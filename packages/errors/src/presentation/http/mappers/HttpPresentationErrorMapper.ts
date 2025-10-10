import { ApplicationError } from '../../../application/ApplicationError';
import { DuplicationError } from '../../../application/DuplicationError';
import { RelationNotFoundError } from '../../../application/RelationNotFoundError';
import { HttpError } from '../HttpError';
import { BadRequestError } from '../BadRequestError';
import { InternalServerError } from '../InternalServerError';

export class HttpPresentationErrorMapper {
	toPresentationError(
		context: HttpError['context'],
		message: HttpError['message'],
		ApplicationError?: ApplicationError,
	): HttpError {
		switch (ApplicationError?.name) {
			case DuplicationError.name:
				return new BadRequestError(context, message, ApplicationError);

			case RelationNotFoundError.name:
				return new BadRequestError(context, message, ApplicationError);

			default:
				return new InternalServerError(context, message, ApplicationError);
		}
	}
}
