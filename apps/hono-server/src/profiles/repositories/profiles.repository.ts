import type { Profile } from '../models/profile.model';
import type { CreateProfileData } from './types/create-profile-data.type';
import type { UpdateProfileData } from './types/update-profile-data.type';

export interface ProfilesRepository {
	findAllByUserId(userId: Profile['userId']): Promise<Profile[]>;
	findById(id: Profile['id']): Promise<Profile | undefined>;
	create(createProfileData: CreateProfileData): Promise<Profile>;
	update(id: string, updateProfileData: UpdateProfileData): Promise<Profile>;
	delete(id: Profile['id']): Promise<Profile>;
}
