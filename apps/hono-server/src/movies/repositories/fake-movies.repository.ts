import type { Movie } from '../movie.model.js';
import type { MoviesRepository } from './movies.repository.js';

export class FakeMoviesRepository implements MoviesRepository {
    private movies: Movie[] = [];

    async create(movie: Movie): Promise<Movie> {
        // NOTE: Creates a copy with a new reference
        this.movies.push(JSON.parse(JSON.stringify(movie)));

        return movie;
    }

    async findAll(): Promise<Movie[]> {
        return this.movies;
    }

    async findById(id: string): Promise<Movie | undefined> {
        return this.movies.find((movie: Movie): boolean => movie.id === id);
    }
}
