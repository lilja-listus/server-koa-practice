import { Repository } from "typeorm";
import { User } from 'common/database/models/user-model';
import getRepository from '../connection';

export class UserRepository {
    private repository: Repository<User> = undefined;

    private async connect(): Promise<void> {
        if (!this.repository) {
            this.repository = await getRepository<User>(
                User
            );
        }
    }

    public async findById(id: number): Promise<User | undefined> {
        await this.connect();

        return this.repository.findOne({ id: id });
        // select * from where id = :id;

    }
}
export default new UserRepository(); 
