import type { Profile } from '@packages/models/profiles/Profile';

export type UpdateProfilePayload = Partial<Omit<Profile, 'id' | 'userId'>>;
