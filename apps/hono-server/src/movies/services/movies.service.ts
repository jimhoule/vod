import type { Movie } from '@packages/models/movies/Movie';
import type { MoviesRepository } from '@movies/repositories/movies.repository';
import type { CreateMoviePayload } from '@movies/services/payloads/create-movie.payload';
import type { UpdateMoviePayload } from '@movies/services/payloads/update-movie.payload';
import { withId } from '@utils/with-id';

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
