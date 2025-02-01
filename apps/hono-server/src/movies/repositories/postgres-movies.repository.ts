import { eq } from 'drizzle-orm';
import { db } from '../../drizzle/db.js';
import { MoviesTable } from '../../drizzle/schema.js';
import type { Movie } from '../models/movie.model.js';
import type { MoviesRepository } from './movies.repository.js';
import type { CreateMovieData } from './types/create-movie-data.type.js';
import type { UpdateMovieData } from './types/update-movie-data.type.js';

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
