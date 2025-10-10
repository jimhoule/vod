import { Hono } from 'hono';
import { ApplicationErrorMapper } from '@packages/errors/application/mappers/ApplicationErrorMapper';
import { PostgresRepositoryInfrastructureErrorMapper } from '@packages/errors/infrastructure/repositories/mappers/PostgresRepositoryInfrastructureErrorMapper';
import { HttpPresentationErrorMapper } from '@packages/errors/presentation/http/mappers/HttpPresentationErrorMapper';
import { ProfilesService } from '@profiles/application/services/ProfilesService';
import { FakeProfilesRepository } from '@profiles/infrastructure/repositories/fake/FakeProfilesRepository';
import { PostgresProfilesRepository } from '@profiles/infrastructure/repositories/postgres/PostgresProfilesRepository';
import { ProfilesController } from '@profiles/presentation/http/controllers/ProfilesController';
import { uuidService } from '@uuid/uuidModule';

export const createProfilesTestService = () =>
	new ProfilesService(new ApplicationErrorMapper(), new FakeProfilesRepository(), uuidService);
export const createProfilesController = (profilesService: ProfilesService) =>
	new ProfilesController(new HttpPresentationErrorMapper(), profilesService);
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
	new ApplicationErrorMapper(),
	new PostgresProfilesRepository(new PostgresRepositoryInfrastructureErrorMapper()),
	uuidService,
);
export const profilesRoutes = createProfilesRoutes(createProfilesController(profilesService));
