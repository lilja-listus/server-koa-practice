import { UserRepository } from 'common/database/repositories';
import { NotFound, BadRequest } from 'api/src/helpers/response-errors';
//import { Repository } from 'typeorm';

interface ICreateUser {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
}


export class UserHandler {
    public async getById(userId: number) {
        // call db to get user information
        const userInfo = await UserRepository.findById(userId);

        if (!userInfo) {
            throw new NotFound()
        }

        return userInfo;
    }

    public async create(userBody: ICreateUser) {
        const email = userBody.email;
        const userWithEmail = await UserRepository.findByEmail(email);

        if (userWithEmail) {
            throw new BadRequest();
        }

        const createdUser = await UserRepository.createUser(userBody);

        return createdUser;

    }


    // public async updateUser(userId, userBody) { }

    // public async deleteUser(userId) { }
}
