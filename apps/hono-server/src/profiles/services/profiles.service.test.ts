import { expect, describe, it } from 'vitest';
import { createProfilesTestService } from '../profiles.module';
import type { CreateProfilePayload } from './payloads/create-profile.payload';
import type { UpdateProfilePayload } from './payloads/update-profile.payload';

describe('ProfilesService', (): void => {
	const getTestContext = async () => {
		const profilesService = createProfilesTestService();

		const createProfilePayload: CreateProfilePayload = {
			name: 'Fake name',
			userId: 'b9e93783-b6ea-4342-a9fb-b2ccfd680f11',
		};
		const profile = await profilesService.create(createProfilePayload);

		return {
			profile,
			createProfilePayload,
			profilesService,
		};
	};

	it('should create profile', async () => {
		const { profile, createProfilePayload } = await getTestContext();

		expect(profile).toBeDefined();
		expect(profile.name).toEqual(createProfilePayload.name);
		expect(profile.userId).toEqual(createProfilePayload.userId);
	});

	it('should find all profiles by user ID', async () => {
		const { profile, profilesService } = await getTestContext();

		const profiles = await profilesService.findAllByUserId(profile.userId);

		expect(profile).toBeDefined();
		expect(profiles).toBeDefined();
		expect(profiles).toHaveLength(1);
		expect(profiles[0]).toEqual(profile);
	});

	it('should find profile by ID', async () => {
		const { profile, profilesService } = await getTestContext();

		const foundProfile = await profilesService.findById(profile.id);

		expect(profile).toBeDefined();
		expect(foundProfile).toBeDefined();
		expect(foundProfile).toEqual(profile);
	});

	it('should not find profile by ID', async () => {
		const { profilesService } = await getTestContext();

		const profile = await profilesService.findById('340f82f1-0e78-4a5c-b7ab-c26bcf56cf09');

		expect(profile).not.toBeDefined();
	});

	it('should update profile', async () => {
		const { profile, profilesService } = await getTestContext();

		const updateProfilePayload: UpdateProfilePayload = {
			name: 'Updated fake name',
		};
		const updatedProfile = await profilesService.update(profile.id, updateProfilePayload);

		expect(profile).toBeDefined();
		expect(updatedProfile).toBeDefined();
		expect(updatedProfile.id).toEqual(profile.id);
		expect(updatedProfile.name).toEqual(updateProfilePayload.name);
	});

	it('should delete profile', async () => {
		const { profile, profilesService } = await getTestContext();

		const deletedProfile = await profilesService.delete(profile.id);

		expect(profile).toBeDefined();
		expect(deletedProfile).toBeDefined();
		expect(deletedProfile.id).toEqual(profile.id);
		expect(deletedProfile.name).toEqual(profile.name);
		expect(deletedProfile.userId).toEqual(profile.userId);
	});
});
