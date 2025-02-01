import type { Movie } from '../models/movie.model.js';
import type { MoviesRepository } from '../repositories/movies.repository.js';
import type { CreateMoviePayload } from './payloads/create-movie.payload.js';
import type { UpdateMoviePayload } from './payloads/update-movie.payload.js';
import { withId } from '../../utils/with-id.js';

export class MoviesService {
	constructor(private readonly moviesRepository: MoviesRepository) {}

	findAll(): Promise<Movie[]> {
		return this.moviesRepository.findAll();
	}

	findById(id: Movie['id']): Promise<Movie | undefined> {
		return this.moviesRepository.findById(id);
	}

	create(createMoviePayload: CreateMoviePayload): Promise<Movie> {
		return this.moviesRepository.create(withId(createMoviePayload));
	}

	update(id: Movie['id'], updateMoviePayload: UpdateMoviePayload): Promise<Movie> {
		return this.moviesRepository.update(id, updateMoviePayload);
	}

	delete(id: Movie['id']): Promise<Movie> {
		return this.moviesRepository.delete(id);
	}
}
