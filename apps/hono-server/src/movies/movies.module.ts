import { Hono } from 'hono';
import { FakeMoviesRepository } from './repositories/fake-movies.repository.js';
import { PostgresMoviesRepository } from './repositories/postgres-movies.repository.js';
import { MoviesService } from './movies.service.js';
import { MoviesController } from './movies.controller.js';

export const createMoviesRoutes = (moviesController: MoviesController) => {
    return new Hono()
        .basePath('/movies')
        .post('/', ...moviesController.create())
        .get('/', ...moviesController.findAll())
        .get('/:id', ...moviesController.findById());
};

export const moviesService = new MoviesService(new PostgresMoviesRepository());
export const moviesRoutes = createMoviesRoutes(new MoviesController(moviesService));

export const createMoviesTestService = () => new MoviesService(new FakeMoviesRepository());
