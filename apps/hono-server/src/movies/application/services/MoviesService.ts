import type { Movie } from '@packages/models/movies/Movie';
import type { CreateMoviePayload } from '@movies/application/services/payloads/CreateMoviePayload';
import type { UpdateMoviePayload } from '@movies/application/services/payloads/UpdateMoviePayload';
import type { MoviesRepository } from '@movies/infrastructure/repositories/MoviesRepository';
import { withId } from '@utils/mixins/withId';

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
