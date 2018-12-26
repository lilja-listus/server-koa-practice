import { UserRepository } from 'common/database/repositories';
import { NOTFOUND } from 'dns';


export class UserHandler {
    public async getById(userId: number) {
        let userInfo;

        // call db to get user information
        userInfo = UserRepository.findById(userId);

        if (! userInfo) {
            throw new NOTFOUND(user not found)
        }

        // if not found throw new 404Error
        return userInfo;


    }


    // public async createUser(userBody: object) { }

    // public async updateUser(userId, userBody) { }

    // public async deleteUser(userId) { }
}