import { hc } from 'hono/client';
import { HonoServerType } from '../../../hono-server/src/main';

export const apiClient = hc<HonoServerType>('http://localhost:3002/');
