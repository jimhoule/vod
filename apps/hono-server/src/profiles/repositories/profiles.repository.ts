import type { Profile } from '../models/profile.model.js';
import type { CreateProfileData } from './types/create-profile-data.type.js';
import type { UpdateProfileData } from './types/update-profile-data.type.js';

export interface ProfilesRepository {
	findAll(): Promise<Profile[]>;
	findById(id: Profile['id']): Promise<Profile | undefined>;
	create(createProfileData: CreateProfileData): Promise<Profile>;
	update(id: string, updateProfileData: UpdateProfileData): Promise<Profile>;
	delete(id: Profile['id']): Promise<Profile>;
}
