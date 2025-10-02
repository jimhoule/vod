import { db } from '@packages/db';
import { eq } from '@packages/db/orm';
import { MoviesTable } from '@packages/db/schema/MoviesTable';
import type { Movie } from '@packages/models/movies/Movie';
import type { MoviesRepository } from '@movies/repositories/movies.repository';
import type { CreateMovieData } from '@movies/repositories/types/create-movie-data.type';
import type { UpdateMovieData } from '@movies/repositories/types/update-movie-data.type';

export class PostgresMoviesRepository implements MoviesRepository {
	async findAll(): Promise<Movie[]> {
		return db.select().from(MoviesTable);
	}

	async findById(id: Movie['id']): Promise<Movie | undefined> {
		const [movie] = await db.select().from(MoviesTable).where(eq(MoviesTable.id, id));

		return movie;
	}

	async create(createMovieData: CreateMovieData): Promise<Movie> {
		const [newMovie] = await db.insert(MoviesTable).values(createMovieData).returning();

		return newMovie as Movie;
	}

	async update(id: Movie['id'], updateMovieData: UpdateMovieData): Promise<Movie> {
		const [movie] = await db
			.update(MoviesTable)
			.set(updateMovieData)
			.where(eq(MoviesTable.id, id))
			.returning();

		return movie as Movie;
	}

	async delete(id: Movie['id']): Promise<Movie> {
		const [movie] = await db.delete(MoviesTable).where(eq(MoviesTable.id, id)).returning();

		return movie as Movie;
	}
}
