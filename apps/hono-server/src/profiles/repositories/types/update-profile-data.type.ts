import type { Profile } from '../../models/profile.model';

export type UpdateProfileData = Partial<Omit<Profile, 'id' | 'userId'>>;
