import type { Profile } from '../../models/profile.model.js';

export type CreateProfilePayload = Omit<Profile, 'id'>;
