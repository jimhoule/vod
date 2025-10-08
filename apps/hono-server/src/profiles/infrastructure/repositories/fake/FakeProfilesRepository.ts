import type { AsyncResult } from '@packages/core/async';
import type { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';
import type { Profile } from '@packages/models/profiles/Profile';
import type { ProfilesRepository } from '@profiles/infrastructure/repositories/ProfilesRepository';
import type { CreateProfileData } from '@profiles/infrastructure/repositories/types/CreateProfileData';
import type { UpdateProfileData } from '@profiles/infrastructure/repositories/types/UpdateProfileData';

export class FakeProfilesRepository implements ProfilesRepository {
	private profiles: Profile[] = [];

	async findAllByUserId(
		userId: Profile['userId'],
	): Promise<AsyncResult<Profile[], InfrastructureError>> {
		const profiles = this.profiles.filter(
			(profile: Profile): boolean => profile.userId === userId,
		);

		return [profiles, null];
	}

	async findById(
		id: Profile['id'],
	): Promise<AsyncResult<Profile | undefined, InfrastructureError>> {
		const profile = this.profiles.find((profile: Profile): boolean => profile.id === id);

		return [profile, null];
	}

	async create(
		createProfileData: CreateProfileData,
	): Promise<AsyncResult<Profile, InfrastructureError>> {
		const profile = createProfileData;
		// NOTE: Creates a copy with a new reference
		this.profiles.push(JSON.parse(JSON.stringify(profile)));

		return [profile, null];
	}

	async update(
		id: Profile['id'],
		updateProfileData: UpdateProfileData,
	): Promise<AsyncResult<Profile, InfrastructureError>> {
		const [profile, error] = await this.findById(id);
		if (error) {
			return [null, error];
		}

		Object.assign(profile as Profile, updateProfileData);

		return [profile as Profile, null];
	}

	async delete(id: Profile['id']): Promise<AsyncResult<Profile, InfrastructureError>> {
		const [profile, error] = await this.findById(id);
		if (error) {
			return [null, error];
		}

		this.profiles = this.profiles.filter((profile: Profile): boolean => profile.id !== id);

		return [profile as Profile, null];
	}
}
