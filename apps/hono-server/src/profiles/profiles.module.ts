import { Hono } from 'hono';
import { FakeProfilesRepository } from './repositories/fake-profiles.repository.js';
import { PostgresProfilesRepository } from './repositories/postgres-profiles.repository.js';
import { ProfilesService } from './services/profiles.service.js';
import { ProfilesController } from './controllers/profiles.controller.js';

export const createProfilesTestService = () => new ProfilesService(new FakeProfilesRepository());
export const createProfilesController = (profilesService: ProfilesService) =>
	new ProfilesController(profilesService);
export const createProfilesRoutes = (profilesController: ProfilesController) => {
	return new Hono()
		.basePath('/profiles')
		.get('/', ...profilesController.findAll())
		.get('/:id', ...profilesController.findById())
		.post('/', ...profilesController.create())
		.put('/:id', ...profilesController.update())
		.delete('/:id', ...profilesController.delete());
};

export const profilesService = new ProfilesService(new PostgresProfilesRepository());
export const profilesRoutes = createProfilesRoutes(createProfilesController(profilesService));
