import { UserRepository } from 'common/database/repositories';
import { NotFound } from 'api/src/helpers/response-errors';


export class UserHandler {
    public async getById(userId: number) {
        // call db to get user information
        const userInfo = await UserRepository.findById(userId);

        if (!userInfo) {
            throw new NotFound()
        }

        return userInfo;
    }


    // public async createUser(userBody: object) { }

    // public async updateUser(userId, userBody) { }

    // public async deleteUser(userId) { }
}