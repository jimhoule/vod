import type { Profile } from '../../models/profile.model.js';

export type UpdateProfileData = Partial<Omit<Profile, 'id'>>;
