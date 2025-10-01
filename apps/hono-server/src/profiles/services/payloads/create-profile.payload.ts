import type { Profile } from '../../models/profile.model';

export type CreateProfilePayload = Omit<Profile, 'id'>;
