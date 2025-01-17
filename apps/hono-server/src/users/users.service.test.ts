import { expect, describe, it } from 'vitest';
import { createUsersTestService } from './users.module.js';

describe('UsersService', (): void => {
    const getTestContext = async () => {
        const usersService = createUsersTestService();

        const createUserPayload = {
            firstName: 'Jenny',
            lastName: 'Doe',
            email: 'test@test.com',
            password: 'password',
        };
        const user = await usersService.create(
            createUserPayload.firstName,
            createUserPayload.lastName,
            createUserPayload.email,
            createUserPayload.password,
        );

        return {
            user,
            createUserPayload,
            usersService,
        };
    };

    it('should create user', async () => {
        const { user, createUserPayload } = await getTestContext();

        expect(user).toBeDefined();
        expect(user.firstName).toEqual(createUserPayload.firstName);
        expect(user.lastName).toEqual(createUserPayload.lastName);
        expect(user.email).toEqual(createUserPayload.email);
        expect(user.password).toEqual(createUserPayload.password);
    });

    it('should find all users', async () => {
        const { user, usersService } = await getTestContext();

        const users = await usersService.findAll();

        expect(user).toBeDefined();
        expect(users).toBeDefined();
        expect(users).toHaveLength(1);
        expect(users[0]).toEqual(user);
    });

    it('should find user by ID', async () => {
        const { user, usersService } = await getTestContext();

        const foundUser = await usersService.findById(user.id);

        expect(user).toBeDefined();
        expect(foundUser).toBeDefined();
        expect(foundUser).toEqual(user);
    });

    it('should not find user by ID', async () => {
        const { usersService } = await getTestContext();

        const user = await usersService.findById('fakeId');

        expect(user).not.toBeDefined();
    });

    it('should find user by email', async () => {
        const { user, usersService } = await getTestContext();

        const foundUser = await usersService.findByEmail(user.email);

        expect(user).toBeDefined();
        expect(foundUser).toBeDefined();
        expect(foundUser).toEqual(user);
    });

    it('should not find user by email', async () => {
        const { usersService } = await getTestContext();

        const user = await usersService.findByEmail('fakeEmail');

        expect(user).not.toBeDefined();
    });
});
