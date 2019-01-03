import { assert } from 'chai';
import { User } from 'common/database/models/user-model';
import * as faker from 'faker';

import { UserRepository } from 'common/database/repositories';
import userRepository from 'common/database/repositories/user-repository';
describe('User repository integration with Postgres', () => {
    before(async () => {
        //connect to db
        await (UserRepository as any).connect();
    });

    let expectedRecord: User;

    const firstName = faker.random.word();
    const lastName = faker.random.word();
    const age = faker.random.number();
    const email = faker.random.word();

    let actualRecord;

    describe('#findById', () => {
        before(async () => {
            expectedRecord = (UserRepository as any).repository.create({
                firstName,
                lastName,
                age,
                email
            });


            await (UserRepository as any).repository.save(expectedRecord);

            const id = expectedRecord.id;


            actualRecord = await UserRepository.findById(id);

        });

        after(async () => {
            await (UserRepository as any).repository.remove(
                expectedRecord
            );

        });

        it('Should return expecred user', () => {
            assert.deepEqual(expectedRecord, actualRecord);
        });

    });

    describe('#createUser', () => {
        //create user from userRepository 
        before(async () => {
            await UserRepository.createUser({ firstName, lastName, age, email });

            actualRecord = await (UserRepository as any).repository.findOne({ email });

        });

        after(async () => {
            // removes entity from DB
            await (UserRepository as any).repository.remove(
                actualRecord
            );
        });

        it('should create expected record', () => {
            assert.strictEqual(actualRecord.firstName, firstName);
            assert.strictEqual(actualRecord.lastName, lastName);
            assert.strictEqual(actualRecord.age, age);
            assert.strictEqual(actualRecord.email, email);
        })
    });

    describe.only('#findByEmail', () => {

        before(async () => {
            expectedRecord = (UserRepository as any).repository.create({
                firstName,
                lastName,
                age,
                email
            });

            await (userRepository as any).repository.save(expectedRecord);

            const expectedEmail = expectedRecord.email;
            actualRecord = await UserRepository.findByEmail(expectedEmail);

        });

        after(async () => {
            // removes entity from DB
            await (UserRepository as any).repository.remove(
                expectedRecord
            );

        });

        it('should return expected user', () => {
            assert.deepEqual(expectedRecord, actualRecord);
        });

    })
});