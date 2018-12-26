
import axios, { AxiosResponse } from 'axios';
import routes from 'config/routes';
import config from 'config/acceptance';
import * as faker from 'faker';
import { assert } from 'chai';
import { UserRepository } from 'common/database/repositories';

describe('User acceptance tests', () => {

    before(async () => {
        await (UserRepository as any).connect();
    });

    describe('GET /user', () => {
        context('when user exists', () => {
            let response: AxiosResponse;
            let userId: string;

            let expectedUser;

            let userRecord;

            before(async () => {

                expectedUser = {
                    firstName: faker.random.word(),
                    lastName: faker.random.word(),
                    age: faker.random.number()
                };

                userRecord = (UserRepository as any).repository.create(expectedUser);


                await (UserRepository as any).repository.save(userRecord);


                userId = userRecord.id;

                try {
                    response = await axios.get(
                        `${config.baseUrl}${routes.USER}/${userId}`
                    )
                } catch (error) {
                    response = error.response;
                }

            });

            after(async () => {
                await (UserRepository as any).repository.remove(
                    userRecord
                );
            });

            it('should return http 200', () => {
                assert.strictEqual(response.status, 200);
            });

            it('should return expected user information', () => {
                expectedUser.id = userId;

                assert.deepEqual(response.data, expectedUser);
            });

        });

        context('when user doesn not exist', () => {
            let response: AxiosResponse;

            let userId;

            before(async () => {
                userId = faker.random.number();

                try {
                    response = await axios.get(
                        `${config.baseUrl}${routes.USER}/${userId}`);
                } catch (error) {
                    response = error.response;
                }
            });
            after(() => {

            });

            it('should return http 404', () => {
                assert.strictEqual(response.status, 404);
            });

        });

    });
});