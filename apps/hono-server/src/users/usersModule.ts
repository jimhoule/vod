import { Hono } from 'hono';
import { ApplicationErrorMapper } from '@packages/errors/application/mappers/ApplicationErrorMapper';
import { PostgresRepositoryErrorMapper } from '@packages/errors/infrastructure/repositories/mappers/PostgresRepositoryErrorMapper';
import { profilesService, createProfilesTestService } from '@profiles/profilesModule';
import { UsersService } from '@users/application/services/UsersService';
import { FakeUsersRepository } from '@users/infrastructure/repositories/fake/FakeUsersRepository';
import { PostgresUsersRepository } from '@users/infrastructure/repositories/postgres/PostgresUsersRepository';
import { UsersController } from '@users/presentation/controllers/UsersController';
import { uuidService } from '@uuid/uuidModule';

export const createUsersTestService = () =>
	new UsersService(
		new ApplicationErrorMapper(),
		new FakeUsersRepository(),
		createProfilesTestService(),
		uuidService,
	);
export const createUsersController = (usersService: UsersService) =>
	new UsersController(usersService);
export const createUsersRoutes = (usersController: UsersController) => {
	return new Hono()
		.basePath('/users')
		.get('/', ...usersController.findAll())
		.get('/:id', ...usersController.findById());
};

export const usersService = new UsersService(
	new ApplicationErrorMapper(),
	new PostgresUsersRepository(new PostgresRepositoryErrorMapper()),
	profilesService,
	uuidService,
);
export const usersRoutes = createUsersRoutes(createUsersController(usersService));
