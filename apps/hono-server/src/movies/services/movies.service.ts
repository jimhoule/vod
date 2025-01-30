import type { Movie } from '../models/movie.model.js';
import type { MoviesRepository } from '../repositories/movies.repository.js';
import { withId } from '../../utils/with-id.js';

export class MoviesService {
	constructor(private readonly moviesRepository: MoviesRepository) {}

	async create(title: string, description: string): Promise<Movie> {
		const movie: Movie = withId({
			title,
			description,
		});

		return this.moviesRepository.create(movie);
	}

	findAll(): Promise<Movie[]> {
		return this.moviesRepository.findAll();
	}

	findById(id: string): Promise<Movie | undefined> {
		return this.moviesRepository.findById(id);
	}
}
