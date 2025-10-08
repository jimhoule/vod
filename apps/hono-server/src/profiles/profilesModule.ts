import { Hono } from 'hono';
import { PostgresRepositoryErrorMapper } from '@packages/errors/infrastructure/repositories/mappers/PostgresRepositoryErrorMapper';
import { ProfilesService } from '@profiles/application/services/ProfilesService';
import { FakeProfilesRepository } from '@profiles/infrastructure/repositories/fake/FakeProfilesRepository';
import { PostgresProfilesRepository } from '@profiles/infrastructure/repositories/postgres/PostgresProfilesRepository';
import { ProfilesController } from '@profiles/presentation/http/controllers/ProfilesController';

export const createProfilesTestService = () => new ProfilesService(new FakeProfilesRepository());
export const createProfilesController = (profilesService: ProfilesService) =>
	new ProfilesController(profilesService);
export const createProfilesRoutes = (profilesController: ProfilesController) => {
	return new Hono()
		.basePath('/profiles')
		.get('/all/:userId', ...profilesController.findAllByUserId())
		.get('/:id', ...profilesController.findById())
		.post('/', ...profilesController.create())
		.put('/:id', ...profilesController.update())
		.delete('/:id', ...profilesController.delete());
};

export const profilesService = new ProfilesService(
	new PostgresProfilesRepository(new PostgresRepositoryErrorMapper()),
);
export const profilesRoutes = createProfilesRoutes(createProfilesController(profilesService));
