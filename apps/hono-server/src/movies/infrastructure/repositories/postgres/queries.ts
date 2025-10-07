import { db } from '@packages/db';
import { eq } from '@packages/db/orm';
import { MoviesTable } from '@packages/db/schema/MoviesTable';
import type { Movie } from '@packages/models/movies/Movie';
import type { CreateMovieData } from '@movies/infrastructure/repositories/types/CreateMovieData';
import type { UpdateMovieData } from '@movies/infrastructure/repositories/types/UpdateMovieData';

export const findAllMovies = () => db.select().from(MoviesTable);

export const findMovieById = async (id: Movie['id']) => {
	const [movie] = await db.select().from(MoviesTable).where(eq(MoviesTable.id, id));

	return movie;
};

export const createMovie = async (createMovieData: CreateMovieData) => {
	const [movie] = await db.insert(MoviesTable).values(createMovieData).returning();

	return movie as Movie;
};

export const updateMovie = async (id: Movie['id'], updateMovieData: UpdateMovieData) => {
	const [movie] = await db
		.update(MoviesTable)
		.set(updateMovieData)
		.where(eq(MoviesTable.id, id))
		.returning();

	return movie as Movie;
};

export const deleteMovie = async (id: Movie['id']) => {
	const [movie] = await db.delete(MoviesTable).where(eq(MoviesTable.id, id)).returning();

	return movie as Movie;
};
