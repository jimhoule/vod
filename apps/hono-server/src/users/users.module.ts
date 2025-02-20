import { Hono } from 'hono';
import { FakeUsersRepository } from './repositories/fake-users.repository.js';
import { PostgresUsersRepository } from './repositories/postgres-users.repository.js';
import { UsersService } from './services/users.service.js';
import { UsersController } from './controllers/users.controller.js';
import { profilesService, createProfilesTestService } from '../profiles/profiles.module.js';

export const createUsersTestService = () =>
	new UsersService(new FakeUsersRepository(), createProfilesTestService());
export const createUsersController = (usersService: UsersService) =>
	new UsersController(usersService);
export const createUsersRoutes = (usersController: UsersController) => {
	return new Hono()
		.basePath('/users')
		.get('/', ...usersController.findAll())
		.get('/:id', ...usersController.findById());
};

export const usersService = new UsersService(new PostgresUsersRepository(), profilesService);
export const usersRoutes = createUsersRoutes(createUsersController(usersService));
