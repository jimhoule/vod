import type { Profile } from '@packages/models/profiles/Profile';

export type CreateProfilePayload = Omit<Profile, 'id'>;
