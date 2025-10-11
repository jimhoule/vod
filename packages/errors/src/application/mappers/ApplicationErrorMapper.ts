import { ApplicationError } from '../ApplicationError';
import { DuplicationError } from '../DuplicationError';
import { RelationNotFoundError } from '../RelationNotFoundError';
import { InfrastructureError } from '../../infrastructure/InfrastructureError';
import { ForeignKeyViolationError } from '../../infrastructure/repositories/ForeignKeyViolationError';
import { UniqueViolationError } from '../../infrastructure/repositories/UniqueViolationError';

export class ApplicationErrorMapper {
	toApplicationError(
		context: ApplicationError['context'],
		infrastructureError: InfrastructureError,
	): ApplicationError {
		switch (infrastructureError.name) {
			case ForeignKeyViolationError.name:
				return new RelationNotFoundError(context, infrastructureError);

			case UniqueViolationError.name:
				return new DuplicationError(context, infrastructureError);

			default:
				return new ApplicationError(
					'ApplicationError',
					context,
					'Error happened in the Application layer',
					infrastructureError,
				);
		}
	}
}
