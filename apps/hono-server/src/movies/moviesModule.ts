import { Hono } from 'hono';
import { MoviesService } from '@movies/application/services/MoviesService';
import { FakeMoviesRepository } from '@movies/infrastructure/repositories/FakeMoviesRepository';
import { PostgresMoviesRepository } from '@movies/infrastructure/repositories/PostgresMoviesRepository';
import { MoviesController } from '@movies/presentation/http/controllers/MoviesController';

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
