import { Hono } from 'hono';
import { MoviesController } from '@movies/controllers/movies.controller';
import { FakeMoviesRepository } from '@movies/repositories/fake-movies.repository';
import { PostgresMoviesRepository } from '@movies/repositories/postgres-movies.repository';
import { MoviesService } from '@movies/services/movies.service';

export const createMoviesTestService = () => new MoviesService(new FakeMoviesRepository());
export const createMoviesController = (moviesService: MoviesService) =>
	new MoviesController(moviesService);
export const createMoviesRoutes = (moviesController: MoviesController) => {
	return new Hono()
		.basePath('/movies')
		.get('/', ...moviesController.findAll())
		.get('/:id', ...moviesController.findById())
		.post('/', ...moviesController.create())
		.put('/:id', ...moviesController.update())
		.delete('/:id', ...moviesController.delete());
};

export const moviesService = new MoviesService(new PostgresMoviesRepository());
export const moviesRoutes = createMoviesRoutes(createMoviesController(moviesService));
