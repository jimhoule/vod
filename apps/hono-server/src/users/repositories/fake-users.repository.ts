import type { User } from '../user.model.js';
import type { UsersRepository } from './users.repository.js';

export class FakeUsersRepository implements UsersRepository {
    private users: User[] = [];

    async create(user: User): Promise<User> {
        const doesAlreadyExist = await this.findByEmail(user.email);
        if (doesAlreadyExist) {
            throw new Error(`User with email ${user.email} already exists`);
        }

        // NOTE: Creates a copy with a new reference
        this.users.push(JSON.parse(JSON.stringify(user)));

        return user;
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findById(id: string): Promise<User | undefined> {
        return this.users.find((user: User): boolean => user.id === id);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find((user: User): boolean => user.email === email);
    }
}
