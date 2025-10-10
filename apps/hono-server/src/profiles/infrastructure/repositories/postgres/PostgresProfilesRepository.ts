import { async } from '@packages/core/async';
import type { Either } from '@packages/core/types/Either';
import type { PostgresError } from '@packages/db/postgres';
import type { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';
import type { PostgresRepositoryInfrastructureErrorMapper } from '@packages/errors/infrastructure/repositories/mappers/PostgresRepositoryInfrastructureErrorMapper';
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
	constructor(
		private readonly postgresRepositoryInfrastructureErrorMapper: PostgresRepositoryInfrastructureErrorMapper,
	) {}

	async findAllByUserId(
		userId: Profile['userId'],
	): Promise<Either<Profile[], InfrastructureError>> {
		const [profiles, error] = await async(findAllProfilesByUserId(userId));
		if (error) {
			const infrastructureError =
				this.postgresRepositoryInfrastructureErrorMapper.toInfrastructureError(
					error.cause as PostgresError,
					'PostgresProfilesRepository/findAllByUserId',
				);
			return [null, infrastructureError];
		}

		return [profiles, null];
	}

	async findById(id: Profile['id']): Promise<Either<Profile | undefined, InfrastructureError>> {
		const [profile, error] = await async(findProfileById(id));
		if (error) {
			const infrastructureError =
				this.postgresRepositoryInfrastructureErrorMapper.toInfrastructureError(
					error.cause as PostgresError,
					'PostgresProfilesRepository/findById',
				);
			return [null, infrastructureError];
		}

		return [profile, null];
	}

	async create(
		createProfileData: CreateProfileData,
	): Promise<Either<Profile, InfrastructureError>> {
		const [profile, error] = await async(createProfile(createProfileData));
		if (error) {
			const infrastructureError =
				this.postgresRepositoryInfrastructureErrorMapper.toInfrastructureError(
					error.cause as PostgresError,
					'PostgresProfilesRepository/create',
				);
			return [null, infrastructureError];
		}

		return [profile, null];
	}

	async update(
		id: Profile['id'],
		updateProfileData: UpdateProfileData,
	): Promise<Either<Profile, InfrastructureError>> {
		const [profile, error] = await async(updateProfile(id, updateProfileData));
		if (error) {
			const infrastructureError =
				this.postgresRepositoryInfrastructureErrorMapper.toInfrastructureError(
					error.cause as PostgresError,
					'PostgresProfilesRepository/update',
				);
			return [null, infrastructureError];
		}

		return [profile, null];
	}

	async delete(id: Profile['id']): Promise<Either<Profile, InfrastructureError>> {
		const [profile, error] = await async(deleteProfile(id));
		if (error) {
			const infrastructureError =
				this.postgresRepositoryInfrastructureErrorMapper.toInfrastructureError(
					error.cause as PostgresError,
					'PostgresProfilesRepository/delete',
				);
			return [null, infrastructureError];
		}

		return [profile, null];
	}
}
