import { async, type AsyncResult } from '@packages/core/async';
import type { PostgresError } from '@packages/db/postgres';
import type { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';
import type { PostgresRepositoryErrorMapper } from '@packages/errors/infrastructure/repositories/mappers/PostgresRepositoryErrorMapper';
import type { Profile } from '@packages/models/profiles/Profile';
import type { ProfilesRepository } from '@profiles/infrastructure/repositories/ProfilesRepository';
import type { CreateProfileData } from '@profiles/infrastructure/repositories/types/CreateProfileData';
import type { UpdateProfileData } from '@profiles/infrastructure/repositories/types/UpdateProfileData';
import {
	findAllProfilesByUserId,
	findProfileById,
	createProfile,
	updateProfile,
	deleteProfile,
} from '@profiles/infrastructure/repositories/postgres/queries';

export class PostgresProfilesRepository implements ProfilesRepository {
	constructor(private readonly postgresRepositoryErrorMapper: PostgresRepositoryErrorMapper) {}

	async findAllByUserId(
		userId: Profile['userId'],
	): Promise<AsyncResult<Profile[], InfrastructureError>> {
		const [profiles, error] = await async(findAllProfilesByUserId(userId));
		if (error) {
			const postgresError = error.cause as PostgresError;
			const MappedInfrastructureError =
				this.postgresRepositoryErrorMapper.toInfrastructureError(postgresError.code);
			const mappedInfrastructureError = new MappedInfrastructureError(
				'PostgresProfilesRepository/findAllByUserId',
				postgresError.message,
			);

			return [null, mappedInfrastructureError];
		}

		return [profiles, null];
	}

	async findById(
		id: Profile['id'],
	): Promise<AsyncResult<Profile | undefined, InfrastructureError>> {
		const [profile, error] = await async(findProfileById(id));
		if (error) {
			const postgresError = error.cause as PostgresError;
			const MappedInfrastructureError =
				this.postgresRepositoryErrorMapper.toInfrastructureError(postgresError.code);
			const mappedInfrastructureError = new MappedInfrastructureError(
				'PostgresProfilesRepository/findById',
				postgresError.message,
			);

			return [null, mappedInfrastructureError];
		}

		return [profile, null];
	}

	async create(
		createProfileData: CreateProfileData,
	): Promise<AsyncResult<Profile, InfrastructureError>> {
		const [profile, error] = await async(createProfile(createProfileData));
		if (error) {
			const postgresError = error.cause as PostgresError;
			const MappedInfrastructureError =
				this.postgresRepositoryErrorMapper.toInfrastructureError(postgresError.code);
			const mappedInfrastructureError = new MappedInfrastructureError(
				'PostgresProfilesRepository/create',
				postgresError.message,
			);

			return [null, mappedInfrastructureError];
		}

		return [profile, null];
	}

	async update(
		id: Profile['id'],
		updateProfileData: UpdateProfileData,
	): Promise<AsyncResult<Profile, InfrastructureError>> {
		const [profile, error] = await async(updateProfile(id, updateProfileData));
		if (error) {
			const postgresError = error.cause as PostgresError;
			const MappedInfrastructureError =
				this.postgresRepositoryErrorMapper.toInfrastructureError(postgresError.code);
			const mappedInfrastructureError = new MappedInfrastructureError(
				'PostgresProfilesRepository/update',
				postgresError.message,
			);

			return [null, mappedInfrastructureError];
		}

		return [profile, null];
	}

	async delete(id: Profile['id']): Promise<AsyncResult<Profile, InfrastructureError>> {
		const [profile, error] = await async(deleteProfile(id));
		if (error) {
			const postgresError = error.cause as PostgresError;
			const MappedInfrastructureError =
				this.postgresRepositoryErrorMapper.toInfrastructureError(postgresError.code);
			const mappedInfrastructureError = new MappedInfrastructureError(
				'PostgresProfilesRepository/delete',
				postgresError.message,
			);

			return [null, mappedInfrastructureError];
		}

		return [profile, null];
	}
}
