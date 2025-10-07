import { expect, describe, it } from 'vitest';
import { createMoviesTestService } from '@movies/moviesModule';
import type { CreateMoviePayload } from '@movies/application/services/payloads/CreateMoviePayload';
import type { UpdateMoviePayload } from '@movies/application/services/payloads/UpdateMoviePayload';
import type { Movie } from '@packages/models/movies/Movie';

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
		const castedMovies = movies as Movie[];

		expect(castedMovies).toBeDefined();
		expect(castedMovies).toBeDefined();
		expect(castedMovies).toHaveLength(1);
		expect(castedMovies[0]).toEqual(movie);
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
		const castedUpdatedMovie = updatedMovie as Movie;

		expect(movie).toBeDefined();
		expect(castedUpdatedMovie).toBeDefined();
		expect(castedUpdatedMovie.id).toEqual(movie.id);
		expect(castedUpdatedMovie.title).toEqual(updateMoviePayload.title);
		expect(castedUpdatedMovie.description).toEqual(updateMoviePayload.description);
	});

	it('should delete movie', async () => {
		const { movie, moviesService } = await getTestContext();

		const [deletedMovie] = await moviesService.delete(movie.id);
		const castedDeletedMovie = deletedMovie as Movie;

		expect(movie).toBeDefined();
		expect(castedDeletedMovie).toBeDefined();
		expect(castedDeletedMovie.id).toEqual(movie.id);
		expect(castedDeletedMovie.title).toEqual(movie.title);
		expect(castedDeletedMovie.description).toEqual(movie.description);
	});
});
