import { expect, describe, it } from 'vitest';
import { createMoviesTestService } from './movies.module.js';

describe('MoviesService', (): void => {
	const getTestContext = async () => {
		const moviesService = createMoviesTestService();

		const createMoviePayload = {
			title: 'Fake title',
			description: 'Fake description',
		};
		const movie = await moviesService.create(
			createMoviePayload.title,
			createMoviePayload.description,
		);

		return {
			movie,
			createMoviePayload,
			moviesService,
		};
	};

	it('should create movie', async () => {
		const { movie, createMoviePayload } = await getTestContext();

		expect(movie).toBeDefined();
		expect(movie.title).toEqual(createMoviePayload.title);
		expect(movie.description).toEqual(createMoviePayload.description);
	});

	it('should find all movies', async () => {
		const { movie, moviesService } = await getTestContext();

		const movies = await moviesService.findAll();

		expect(movie).toBeDefined();
		expect(movies).toBeDefined();
		expect(movies).toHaveLength(1);
		expect(movies[0]).toEqual(movie);
	});

	it('should find movie by ID', async () => {
		const { movie, moviesService } = await getTestContext();

		const foundMovie = await moviesService.findById(movie.id);

		expect(movie).toBeDefined();
		expect(foundMovie).toBeDefined();
		expect(foundMovie).toEqual(movie);
	});

	it('should not find movie by ID', async () => {
		const { moviesService } = await getTestContext();

		const movie = await moviesService.findById('340f82f1-0e78-4a5c-b7ab-c26bcf56cf09');

		expect(movie).not.toBeDefined();
	});
});
