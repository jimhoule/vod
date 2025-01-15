import { zValidator } from '@hono/zod-validator';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';
import { factory } from '../factory.js';
import { UsersService } from './users.service.js';

const findByIdValidationSchema = z.object({
    id: z.string().uuid(),
});

export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    findAll() {
        return factory.createHandlers(async (c) => {
            const users = await this.usersService.findAll();

            return c.json(users, 200);
        });
    }

    findById() {
        return factory.createHandlers(zValidator('param', findByIdValidationSchema), async (c) => {
            const { id } = c.req.valid('param');
            const user = await this.usersService.findById(id);
            if (!user) {
                throw new HTTPException(404, { message: `User with ID ${id} not found` });
            }

            return c.json(user, 200);
        });
    }
}
