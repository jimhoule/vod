import type { Profile } from '@packages/models/profiles/Profile';

export type UpdateProfileData = Partial<Omit<Profile, 'id' | 'userId'>>;
