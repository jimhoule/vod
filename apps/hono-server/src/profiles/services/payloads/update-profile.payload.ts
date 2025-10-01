import type { Profile } from '../../models/profile.model.js';

export type UpdateProfilePayload = Partial<Omit<Profile, 'id' | 'userId'>>;
