import { assert } from 'chai';
import { User } from 'common/database/models/user-model';
import * as faker from 'faker';

import { UserRepository } from 'common/database/repositories';
describe('User repository integration with Postgres', () => {
    before(async () => {
        //connect to db
        await (UserRepository as any).connect();
    });

    let expectedRecord: User;

    const firstName = faker.random.word();
    const lastName = faker.random.word();
    const age = faker.random.number();

    let actualRecord;

    describe('#findById', () => {
        before(async () => {
            expectedRecord = (UserRepository as any).repository.create({
                firstName,
                lastName,
                age
            });


            await (UserRepository as any).repository.save(expectedRecord);

            const id = expectedRecord.id;


            actualRecord = await UserRepository.findById(id);

        });

        after(async () => {
            // removes entity from DB
            await (UserRepository as any).repository.remove(
                expectedRecord
            );

        });

        it('Should return expecred user', () => {
            assert.deepEqual(expectedRecord, actualRecord);
        });

    });
});