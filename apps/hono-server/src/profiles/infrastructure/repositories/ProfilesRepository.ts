import type { Either } from '@packages/core/types/Either';
import type { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';
import type { Profile } from '@packages/models/profiles/Profile';
import type { CreateProfileData } from '@profiles/infrastructure/repositories/types/CreateProfileData';
import type { UpdateProfileData } from '@profiles/infrastructure/repositories/types/UpdateProfileData';

export interface ProfilesRepository {
	findAllByUserId(userId: Profile['userId']): Promise<Either<Profile[], InfrastructureError>>;
	findById(id: Profile['id']): Promise<Either<Profile | undefined, InfrastructureError>>;
	create(createProfileData: CreateProfileData): Promise<Either<Profile, InfrastructureError>>;
	update(
		id: string,
		updateProfileData: UpdateProfileData,
	): Promise<Either<Profile, InfrastructureError>>;
	delete(id: Profile['id']): Promise<Either<Profile, InfrastructureError>>;
}
