import { Repository } from "typeorm";
import { User } from 'common/database/models/user-model';
import getRepository from '../connection';

export class UserRepository {
    private repository: Repository<User> = undefined;

    protected async connect(): Promise<void> {
        if (!this.repository) {
            this.repository = await getRepository<User>(
                User
            );
        }
    }


    public async findById() {
        await this.connect();
    }
}
export default new UserRepository(); 