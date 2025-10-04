import type { Profile } from '@packages/models/profiles/Profile';
import type { CreateProfilePayload } from '@profiles/application/services/payloads/CreateProfilePayload';
import type { UpdateProfilePayload } from '@profiles/application/services/payloads/UpdateProfilePayload';
import type { ProfilesRepository } from '@profiles/infrastructure/repositories/ProfilesRepository';
import { withId } from '@utils/mixins/withId';

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
