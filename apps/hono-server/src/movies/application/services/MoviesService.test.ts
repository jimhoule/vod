import { expect, describe, it } from 'vitest';
import type { Movie } from '@packages/models/movies/Movie';
import { createMoviesTestService } from '@movies/moviesModule';
import type { CreateMoviePayload } from '@movies/application/services/payloads/CreateMoviePayload';
import type { UpdateMoviePayload } from '@movies/application/services/payloads/UpdateMoviePayload';

describe('MoviesService', (): void => {
	const getTestContext = async () => {
		const moviesService = createMoviesTestService();

		const createMoviePayload: CreateMoviePayload = {
			title: 'Fake title',
			description: 'Fake description',
		};
		const [movie] = await moviesService.create(createMoviePayload);

		return {
			movie: movie as Movie,
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

		const [movies] = await moviesService.findAll();
		const castMovies = movies as Movie[];

		expect(movie).toBeDefined();
		expect(castMovies).toBeDefined();
		expect(castMovies).toHaveLength(1);
		expect(castMovies[0]).toEqual(movie);
	});

	it('should find movie by ID', async () => {
		const { movie, moviesService } = await getTestContext();

		const [foundMovie] = await moviesService.findById(movie.id);

		expect(movie).toBeDefined();
		expect(foundMovie).toBeDefined();
		expect(foundMovie).toEqual(movie);
	});

	it('should not find movie by ID', async () => {
		const { moviesService } = await getTestContext();

		const [movie] = await moviesService.findById('340f82f1-0e78-4a5c-b7ab-c26bcf56cf09');

		expect(movie).not.toBeDefined();
	});

	it('should update movie', async () => {
		const { movie, moviesService } = await getTestContext();

		const updateMoviePayload: UpdateMoviePayload = {
			title: 'Updated fake title',
			description: 'Updated fake description',
		};
		const [updatedMovie] = await moviesService.update(movie.id, updateMoviePayload);
		const castUpdatedMovie = updatedMovie as Movie;

		expect(movie).toBeDefined();
		expect(castUpdatedMovie).toBeDefined();
		expect(castUpdatedMovie.id).toEqual(movie.id);
		expect(castUpdatedMovie.title).toEqual(updateMoviePayload.title);
		expect(castUpdatedMovie.description).toEqual(updateMoviePayload.description);
	});

	it('should delete movie', async () => {
		const { movie, moviesService } = await getTestContext();

		const [deletedMovie] = await moviesService.delete(movie.id);
		const castDeletedMovie = deletedMovie as Movie;

		expect(movie).toBeDefined();
		expect(castDeletedMovie).toBeDefined();
		expect(castDeletedMovie).toEqual(movie);
	});
});
