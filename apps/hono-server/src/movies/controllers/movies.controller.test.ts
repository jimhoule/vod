import { testClient } from 'hono/testing';
import { describe, expect, it } from 'vitest';
import type { Movie } from '@packages/models/movies/Movie';
import {
	createMoviesTestService,
	createMoviesController,
	createMoviesRoutes,
} from '../movies.module';
import { tokensService } from '../../tokens/tokens.module';

describe('MoviesController', async (): Promise<void> => {
	const getTestContext = async () => {
		const moviesService = createMoviesTestService();
		const moviesRoutes = createMoviesRoutes(createMoviesController(moviesService));
		const mockClient = testClient(moviesRoutes);

		const accessToken = await tokensService.generate({
			id: '340f82f1-0e78-4a5c-b7ab-c26bcf56cf09',
			email: 'fake@fake.com',
		});

		const createMovieDto = {
			title: 'Fake title',
			description: 'Fake description',
		};
		const createMovieResponse = await mockClient.movies.$post(
			{
				json: {
					...createMovieDto,
				},
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);
		const movie = (await createMovieResponse.json()) as Movie;

		return {
			mockClient,
			movie,
			accessToken,
			createMovieResponse,
		};
	};

	it('should create movie', async () => {
		const { createMovieResponse } = await getTestContext();

		expect(createMovieResponse.status).toEqual(201);
	});

	it('should find all movies', async () => {
		const { mockClient, accessToken } = await getTestContext();

		const response = await mockClient.movies.$get(undefined, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		expect(response.status).toEqual(200);
	});

	it('should try to find all movies without access token', async () => {
		const { mockClient } = await getTestContext();

		const response = await mockClient.movies.$get();

		expect(response.status).toEqual(401);
	});

	it('should find movie by ID', async () => {
		const { mockClient, accessToken, movie } = await getTestContext();

		const response = await mockClient.movies[':id'].$get(
			{
				param: {
					id: movie.id,
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

	it('should not find movie by ID', async () => {
		const { mockClient, accessToken } = await getTestContext();

		const response = await mockClient.movies[':id'].$get(
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

	it('should try to find movie by ID without access token', async () => {
		const { mockClient, movie } = await getTestContext();

		const response = await mockClient.movies[':id'].$get({
			param: {
				id: movie.id,
			},
		});

		expect(response.status).toEqual(401);
	});

	it('should try to find movie by ID with invalid uuid', async () => {
		const { mockClient, accessToken } = await getTestContext();

		const response = await mockClient.movies[':id'].$get(
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

	it('should update movie', async () => {
		const { mockClient, accessToken, movie } = await getTestContext();

		const response = await mockClient.movies[':id'].$put(
			{
				param: {
					id: movie.id,
				},
				json: {
					title: 'Updated fake title',
					description: 'Updated fake description',
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

	it('should delete movie', async () => {
		const { mockClient, accessToken, movie } = await getTestContext();

		const response = await mockClient.movies[':id'].$delete(
			{
				param: {
					id: movie.id,
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
