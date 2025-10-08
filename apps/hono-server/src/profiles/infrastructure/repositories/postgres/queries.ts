import { db } from '@packages/db';
import { eq } from '@packages/db/orm';
import { ProfilesTable } from '@packages/db/schema/ProfilesTable';
import type { Profile } from '@packages/models/profiles/Profile';
import type { CreateProfileData } from '@profiles/infrastructure/repositories/types/CreateProfileData';
import type { UpdateProfileData } from '@profiles/infrastructure/repositories/types/UpdateProfileData';

export const findAllProfilesByUserId = (userId: Profile['userId']) =>
	db.select().from(ProfilesTable).where(eq(ProfilesTable.userId, userId));

export const findProfileById = async (id: Profile['id']) => {
	const [profile] = await db.select().from(ProfilesTable).where(eq(ProfilesTable.id, id));

	return profile;
};

export const createProfile = async (createProfileData: CreateProfileData) => {
	const [newProfile] = await db.insert(ProfilesTable).values(createProfileData).returning();

	return newProfile as Profile;
};

export const updateProfile = async (id: Profile['id'], updateProfileData: UpdateProfileData) => {
	const [profile] = await db
		.update(ProfilesTable)
		.set(updateProfileData)
		.where(eq(ProfilesTable.id, id))
		.returning();

	return profile as Profile;
};

export const deleteProfile = async (id: Profile['id']) => {
	const [profile] = await db.delete(ProfilesTable).where(eq(ProfilesTable.id, id)).returning();

	return profile as Profile;
};
