import type { AsyncResult } from '@packages/core/async';
import type { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';
import type { Profile } from '@packages/models/profiles/Profile';
import type { CreateProfileData } from '@profiles/infrastructure/repositories/types/CreateProfileData';
import type { UpdateProfileData } from '@profiles/infrastructure/repositories/types/UpdateProfileData';

export interface ProfilesRepository {
	findAllByUserId(
		userId: Profile['userId'],
	): Promise<AsyncResult<Profile[], InfrastructureError>>;
	findById(id: Profile['id']): Promise<AsyncResult<Profile | undefined, InfrastructureError>>;
	create(
		createProfileData: CreateProfileData,
	): Promise<AsyncResult<Profile, InfrastructureError>>;
	update(
		id: string,
		updateProfileData: UpdateProfileData,
	): Promise<AsyncResult<Profile, InfrastructureError>>;
	delete(id: Profile['id']): Promise<AsyncResult<Profile, InfrastructureError>>;
}
