import { expect, describe, it } from 'vitest';
import { createMoviesTestService } from '../movies.module.js';
import type { UpdateMoviePayload } from './payloads/update-movie.payload.js';

describe('MoviesService', (): void => {
	const getTestContext = async () => {
		const moviesService = createMoviesTestService();

		const createMoviePayload = {
			title: 'Fake title',
			description: 'Fake description',
		};
		const movie = await moviesService.create(createMoviePayload);

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

	it('should update movie', async () => {
		const { movie, moviesService } = await getTestContext();

		const updateMoviePayload: UpdateMoviePayload = {
			title: 'Updated fake title',
			description: 'Updated fake description',
		};
		const updatedMovie = await moviesService.update(movie.id, updateMoviePayload);

		expect(movie).toBeDefined();
		expect(updatedMovie).toBeDefined();
		expect(updatedMovie.id).toEqual(movie.id);
		expect(updatedMovie.title).toEqual(updateMoviePayload.title);
		expect(updatedMovie.description).toEqual(updateMoviePayload.description);
	});

	it('should delete movie', async () => {
		const { movie, moviesService } = await getTestContext();

		const deletedMovie = await moviesService.delete(movie.id);

		expect(movie).toBeDefined();
		expect(deletedMovie).toBeDefined();
		expect(deletedMovie.id).toEqual(movie.id);
		expect(deletedMovie.title).toEqual(movie.title);
		expect(deletedMovie.description).toEqual(movie.description);
	});
});
