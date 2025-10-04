import type { Profile } from '@packages/models/profiles/Profile';
import type { CreateProfileData } from '@profiles/infrastructure/repositories/types/CreateProfileData';
import type { UpdateProfileData } from '@profiles/infrastructure/repositories/types/UpdateProfileData';

export interface ProfilesRepository {
	findAllByUserId(userId: Profile['userId']): Promise<Profile[]>;
	findById(id: Profile['id']): Promise<Profile | undefined>;
	create(createProfileData: CreateProfileData): Promise<Profile>;
	update(id: string, updateProfileData: UpdateProfileData): Promise<Profile>;
	delete(id: Profile['id']): Promise<Profile>;
}
