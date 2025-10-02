import { Hono } from 'hono';
import { UsersController } from '@users/controllers/users.controller';
import { FakeUsersRepository } from '@users/repositories/fake-users.repository';
import { PostgresUsersRepository } from '@users/repositories/postgres-users.repository';
import { UsersService } from '@users/services/users.service';
import { profilesService, createProfilesTestService } from '@profiles/profiles.module';

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
