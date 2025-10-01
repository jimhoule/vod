import { testClient } from 'hono/testing';
import { describe, expect, it } from 'vitest';
import type { Profile } from '@packages/models/profiles/Profile';
import {
	createProfilesTestService,
	createProfilesController,
	createProfilesRoutes,
} from '../profiles.module';
import { tokensService } from '../../tokens/tokens.module';

describe('ProfilesController', async (): Promise<void> => {
	const getTestContext = async () => {
		const profilesService = createProfilesTestService();
		const profilesRoutes = createProfilesRoutes(createProfilesController(profilesService));
		const mockClient = testClient(profilesRoutes);

		const accessToken = await tokensService.generate({
			id: '340f82f1-0e78-4a5c-b7ab-c26bcf56cf09',
			email: 'fake@fake.com',
		});

		const createProfileDto = {
			name: 'Fake name',
			userId: 'b9e93783-b6ea-4342-a9fb-b2ccfd680f11',
		};
		const createProfileResponse = await mockClient.profiles.$post(
			{
				json: {
					...createProfileDto,
				},
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);
		const profile = (await createProfileResponse.json()) as Profile;

		return {
			mockClient,
			profile,
			accessToken,
			createProfileResponse,
		};
	};

	it('should create profile', async () => {
		const { createProfileResponse } = await getTestContext();

		expect(createProfileResponse.status).toEqual(201);
	});

	it('should find all profiles by user ID', async () => {
		const { mockClient, accessToken, profile } = await getTestContext();

		const response = await mockClient.profiles.all[':userId'].$get(
			{
				param: {
					userId: profile.userId,
				},
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		expect(response.status).toEqual(200);
	});

	it('should try to find all profiles by user ID without access token', async () => {
		const { mockClient, profile } = await getTestContext();

		const response = await mockClient.profiles.all[':userId'].$get({
			param: {
				userId: profile.userId,
			},
		});

		expect(response.status).toEqual(401);
	});

	it('should find profile by ID', async () => {
		const { mockClient, accessToken, profile } = await getTestContext();

		const response = await mockClient.profiles[':id'].$get(
			{
				param: {
					id: profile.id,
				},
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		expect(response.status).toEqual(200);
	});

	it('should not find profile by ID', async () => {
		const { mockClient, accessToken } = await getTestContext();

		const response = await mockClient.profiles[':id'].$get(
			{
				param: {
					id: '340f82f1-0e78-4a5c-b7ab-c26bcf56cf09',
				},
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		expect(response.status).toEqual(404);
	});

	it('should try to find profile by ID without access token', async () => {
		const { mockClient, profile } = await getTestContext();

		const response = await mockClient.profiles[':id'].$get({
			param: {
				id: profile.id,
			},
		});

		expect(response.status).toEqual(401);
	});

	it('should try to find profile by ID with invalid uuid', async () => {
		const { mockClient, accessToken } = await getTestContext();

		const response = await mockClient.profiles[':id'].$get(
			{
				param: {
					id: 'fakeId',
				},
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		expect(response.status).toEqual(400);
	});

	it('should update profile', async () => {
		const { mockClient, accessToken, profile } = await getTestContext();

		const response = await mockClient.profiles[':id'].$put(
			{
				param: {
					id: profile.id,
				},
				json: {
					name: 'Updated fake title',
				},
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		expect(response.status).toEqual(200);
	});

	it('should delete profile', async () => {
		const { mockClient, accessToken, profile } = await getTestContext();

		const response = await mockClient.profiles[':id'].$delete(
			{
				param: {
					id: profile.id,
				},
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		expect(response.status).toEqual(204);
	});
});
