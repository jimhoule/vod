import type { Either } from '@packages/core/types/Either';
import { ApplicationError } from '@packages/errors/application/ApplicationError';
import type { Profile } from '@packages/models/profiles/Profile';
import type { CreateProfilePayload } from '@profiles/application/services/payloads/CreateProfilePayload';
import type { UpdateProfilePayload } from '@profiles/application/services/payloads/UpdateProfilePayload';
import type { ProfilesRepository } from '@profiles/infrastructure/repositories/ProfilesRepository';
import type { UuidService } from '@uuid/application/services/UuidService';

export class ProfilesService {
	constructor(
		private readonly profilesRepository: ProfilesRepository,
		private readonly uuidService: UuidService,
	) {}

	async findAllByUserId(userId: Profile['userId']): Promise<Either<Profile[], ApplicationError>> {
		const [profiles, error] = await this.profilesRepository.findAllByUserId(userId);
		if (error) {
			const applicationError = new ApplicationError(
				'ProfilesService/findAllByUserId',
				'',
				error,
			);
			return [null, applicationError];
		}

		return [profiles, null];
	}

	async findById(id: Profile['id']): Promise<Either<Profile | undefined, ApplicationError>> {
		const [profile, error] = await this.profilesRepository.findById(id);
		if (error) {
			const applicationError = new ApplicationError('ProfilesService/findById', '', error);
			return [null, applicationError];
		}

		return [profile, null];
	}

	async create(
		createProfilePayload: CreateProfilePayload,
	): Promise<Either<Profile, ApplicationError>> {
		const [profile, error] = await this.profilesRepository.create({
			...createProfilePayload,
			id: this.uuidService.generate(),
		});
		if (error) {
			const applicationError = new ApplicationError('ProfilesService/create', '', error);
			return [null, applicationError];
		}

		return [profile, null];
	}

	async update(
		id: Profile['id'],
		updateProfilePayload: UpdateProfilePayload,
	): Promise<Either<Profile, ApplicationError>> {
		const [profile, error] = await this.profilesRepository.update(id, updateProfilePayload);
		if (error) {
			const applicationError = new ApplicationError('ProfilesService/update', '', error);
			return [null, applicationError];
		}

		return [profile, null];
	}

	async delete(id: Profile['id']): Promise<Either<Profile, ApplicationError>> {
		const [profile, error] = await this.profilesRepository.delete(id);
		if (error) {
			const applicationError = new ApplicationError('ProfilesService/delete', '', error);
			return [null, applicationError];
		}

		return [profile, null];
	}
}
