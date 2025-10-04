import type { Profile } from '@packages/models/profiles/Profile';
import type { ProfilesRepository } from '@profiles/infrastructure/repositories/ProfilesRepository';
import type { CreateProfileData } from '@profiles/infrastructure/repositories/types/CreateProfileData';
import type { UpdateProfileData } from '@profiles/infrastructure/repositories/types/UpdateProfileData';

export class FakeProfilesRepository implements ProfilesRepository {
	private profiles: Profile[] = [];

	async findAllByUserId(userId: Profile['userId']): Promise<Profile[]> {
		return this.profiles.filter((profile: Profile): boolean => profile.userId === userId);
	}

	async findById(id: Profile['id']): Promise<Profile | undefined> {
		return this.profiles.find((profile: Profile): boolean => profile.id === id);
	}

	async create(createProfileData: CreateProfileData): Promise<Profile> {
		const profile = createProfileData;
		// NOTE: Creates a copy with a new reference
		this.profiles.push(JSON.parse(JSON.stringify(profile)));

		return profile;
	}

	async update(id: Profile['id'], updateProfileData: UpdateProfileData): Promise<Profile> {
		const profile = await this.findById(id);
		if (!profile) {
			throw new Error(`Profile with ID ${id} does not exist`);
		}

		Object.assign(profile, updateProfileData);

		return profile;
	}

	async delete(id: Profile['id']): Promise<Profile> {
		const profile = await this.findById(id);
		this.profiles = this.profiles.filter((profile: Profile): boolean => profile.id !== id);

		return profile as Profile;
	}
}
