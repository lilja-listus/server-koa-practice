
import axios, { AxiosResponse } from 'axios';
import routes from 'config/routes';
import config from 'config/acceptance';
import * as faker from 'faker';
import { assert } from 'chai';

describe('User acceptance tests', () => {
    describe('GET /user', () => {
        context('when user exists', () => {
            let response: AxiosResponse;
            let userId: string;

            let expectedUser: object;

            before(async () => {
                userId = faker.random.uuid();

                expectedUser = {
                    id: userId,
                    firstName: faker.random.word(),
                    lastName: faker.random.word(),
                    age: faker.random.number()
                }

                try {
                    response = await axios.get(
                        `${config.baseUrl}${routes.USER}/${userId}`
                    )
                } catch (error) {
                    response = error.response;
                }

            });

            it('should return http 200', () => {
                assert.strictEqual(response.status, 200);
            });

            it('should return expected user information', () => {
                assert.deepEqual(response.data, expectedUser);
            });

        })

    });

});