import { eq } from 'drizzle-orm';
import { db } from '../../drizzle/db.js';
import { MoviesTable } from '../../drizzle/schema.js';
import type { Movie } from '../models/movie.model.js';
import type { MoviesRepository } from './movies.repository.js';

export class PostgresMoviesRepository implements MoviesRepository {
	async create(movie: Movie): Promise<Movie> {
		const [newMovie] = await db
			.insert(MoviesTable)
			.values({
				id: movie.id,
				title: movie.title,
				description: movie.description,
			})
			.returning();

		return newMovie as Movie;
	}

	async findAll(): Promise<Movie[]> {
		return db.select().from(MoviesTable);
	}

	async findById(id: string): Promise<Movie | undefined> {
		const [movie] = await db.select().from(MoviesTable).where(eq(MoviesTable.id, id));

		return movie;
	}
}
