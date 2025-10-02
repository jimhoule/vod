import { Hono } from 'hono';
import { ProfilesController } from '@profiles/controllers/profiles.controller';
import { FakeProfilesRepository } from '@profiles/repositories/fake-profiles.repository';
import { PostgresProfilesRepository } from '@profiles/repositories/postgres-profiles.repository';
import { ProfilesService } from '@profiles/services/profiles.service';

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

export const profilesService = new ProfilesService(new PostgresProfilesRepository());
export const profilesRoutes = createProfilesRoutes(createProfilesController(profilesService));
