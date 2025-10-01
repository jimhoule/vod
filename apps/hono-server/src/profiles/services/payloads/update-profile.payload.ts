import type { Profile } from '../../models/profile.model';

export type UpdateProfilePayload = Partial<Omit<Profile, 'id' | 'userId'>>;
