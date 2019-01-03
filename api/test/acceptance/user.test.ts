
import axios, { AxiosResponse } from 'axios';
import routes from 'config/routes';
import config from 'config/acceptance';
import * as faker from 'faker';
import { assert } from 'chai';
import { UserRepository } from 'common/database/repositories';
// import { User } from 'common/database/models/user-model';

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
                    age: faker.random.number(),
                    email: faker.random.word()
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

    describe('POST /user', () => {
        context('when requesting to create user', () => {
            let response: AxiosResponse;
            let userRecord;
            let userData;

            let actualUser;



            before(async () => {

                userData = {
                    firstName: faker.random.word(),
                    lastName: faker.random.word(),
                    age: faker.random.number(),
                    email: faker.random.word()
                };
                userRecord;


                try {
                    response = await axios.post(
                        `${config.baseUrl}${routes.USER}`, userData
                    );
                } catch (err) {
                    response = err.response;
                };

                // find user in db by firstName and lastName
                actualUser = await (UserRepository as any).repository.findOne({ firstName: userData.firstName, lastName: userData.lastName, age: userData.age, email: userData.email });
                // select * from user where lastName = lastName AND firstName = firstName AND age = age limit 1;

            });

            after(async () => {
                if (actualUser) {
                    await (UserRepository as any).repository.remove(
                        actualUser
                    );
                }
            });


            it('should create a record in db', async () => {
                assert.isDefined(actualUser);
            });

            it('should return http 200', () => {
                assert.strictEqual(response.status, 200);
            });




        });
        context('when trying to create user with excisting email', () => {
            let response: AxiosResponse;
            // let email: string;
            let userData;
            let userRecord;

            //creates  a user
            before(async () => {
                userData = {
                    firstName: faker.random.word(),
                    lastName: faker.random.word(),
                    age: faker.random.number(),
                    email: faker.random.word()
                };

                //saves the record to db
                userRecord = (UserRepository as any).repository.create(userData);
                await (UserRepository as any).repository.save(userRecord);
                

            

                try {
                    response = await axios.post(
                        `${config.baseUrl}${routes.USER}`, userData
                    );
                } catch (err) {
                    response = err.response;
                }

            });

            after(async () => {
                await (UserRepository as any).repository.remove(userRecord);
            });





            it('should return 400 if the email already exsist', () => {
                assert.strictEqual(response.status, 400);
            })
        });

    });


});
