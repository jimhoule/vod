import { Hono } from 'hono';
import { FakeUsersRepository } from './repositories/fake-users.repository';
import { PostgresUsersRepository } from './repositories/postgres-users.repository';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { profilesService, createProfilesTestService } from '../profiles/profiles.module';

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
