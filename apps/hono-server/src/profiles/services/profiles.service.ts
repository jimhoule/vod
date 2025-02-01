import type { Profile } from '../models/profile.model.js';
import type { ProfilesRepository } from '../repositories/profiles.repository.js';
import type { CreateProfilePayload } from './payloads/create-profile.payload.js';
import type { UpdateProfilePayload } from './payloads/update-profile.payload.js';
import { withId } from '../../utils/with-id.js';

export class ProfilesService {
	constructor(private readonly profilesRepository: ProfilesRepository) {}

	findAll(): Promise<Profile[]> {
		return this.profilesRepository.findAll();
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
