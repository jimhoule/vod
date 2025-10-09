import { Hono } from 'hono';
import { PostgresRepositoryErrorMapper } from '@packages/errors/infrastructure/repositories/mappers/PostgresRepositoryErrorMapper';
import { MoviesService } from '@movies/application/services/MoviesService';
import { FakeMoviesRepository } from '@movies/infrastructure/repositories/fake/FakeMoviesRepository';
import { PostgresMoviesRepository } from '@movies/infrastructure/repositories/postgres/PostgresMoviesRepository';
import { MoviesController } from '@movies/presentation/http/controllers/MoviesController';
import { uuidService } from '@uuid/uuidModule';

export const createMoviesTestService = () =>
	new MoviesService(new FakeMoviesRepository(), uuidService);
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

export const moviesService = new MoviesService(
	new PostgresMoviesRepository(new PostgresRepositoryErrorMapper()),
	uuidService,
);
export const moviesRoutes = createMoviesRoutes(createMoviesController(moviesService));
