import { eq } from 'drizzle-orm';
import { db } from '../../drizzle/db.js';
import { ProfilesTable } from '../../drizzle/schema.js';
import type { Profile } from '../models/profile.model.js';
import type { ProfilesRepository } from './profiles.repository.js';
import type { CreateProfileData } from './types/create-profile-data.type.js';
import type { UpdateProfileData } from './types/update-profile-data.type.js';

export class PostgresProfilesRepository implements ProfilesRepository {
	async findAllByUserId(userId: Profile['userId']): Promise<Profile[]> {
		return db.select().from(ProfilesTable).where(eq(ProfilesTable.userId, userId));
	}

	async findById(id: Profile['id']): Promise<Profile | undefined> {
		const [profile] = await db.select().from(ProfilesTable).where(eq(ProfilesTable.id, id));

		return profile;
	}

	async create(createProfileData: CreateProfileData): Promise<Profile> {
		const [newProfile] = await db.insert(ProfilesTable).values(createProfileData).returning();

		return newProfile as Profile;
	}

	async update(id: Profile['id'], updateProfileData: UpdateProfileData): Promise<Profile> {
		const [profile] = await db
			.update(ProfilesTable)
			.set(updateProfileData)
			.where(eq(ProfilesTable.id, id))
			.returning();

		return profile as Profile;
	}

	async delete(id: Profile['id']): Promise<Profile> {
		const [profile] = await db
			.delete(ProfilesTable)
			.where(eq(ProfilesTable.id, id))
			.returning();

		return profile as Profile;
	}
}
