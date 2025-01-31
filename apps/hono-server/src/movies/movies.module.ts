import { Hono } from 'hono';
import { FakeMoviesRepository } from './repositories/fake-movies.repository.js';
import { PostgresMoviesRepository } from './repositories/postgres-movies.repository.js';
import { MoviesService } from './services/movies.service.js';
import { MoviesController } from './controllers/movies.controller.js';

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
