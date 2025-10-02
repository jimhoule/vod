import type { Profile } from '@packages/models/profiles/Profile';
import type { ProfilesRepository } from '@profiles/repositories/profiles.repository';
import type { CreateProfilePayload } from '@profiles/services/payloads/create-profile.payload';
import type { UpdateProfilePayload } from '@profiles/services/payloads/update-profile.payload';
import { withId } from '@utils/with-id';

export class ProfilesService {
	constructor(private readonly profilesRepository: ProfilesRepository) {}

	findAllByUserId(userId: Profile['userId']): Promise<Profile[]> {
		return this.profilesRepository.findAllByUserId(userId);
	}

	findById(id: Profile['id']): Promise<Profile | undefined> {
		return this.profilesRepository.findById(id);
	}

	create(createProfilePayload: CreateProfilePayload): Promise<Profile> {
		return this.profilesRepository.create(withId(createProfilePayload));
	}

	update(id: Profile['id'], updateProfilePayload: UpdateProfilePayload): Promise<Profile> {
		return this.profilesRepository.update(id, updateProfilePayload);
	}

	delete(id: Profile['id']): Promise<Profile> {
		return this.profilesRepository.delete(id);
	}
}
