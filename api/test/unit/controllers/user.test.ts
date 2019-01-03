import * as sinon from 'sinon';
import * as faker from 'faker';
import { UserHandler } from 'api/src/controllers/user/handler'
import { User } from 'common/database/models/user-model';
import { UserRepository } from 'common/database/repositories';
import { assert } from 'chai';
import { NotFound, BadRequest } from 'api/src/helpers/response-errors';

describe('User controller unit tests', () => {
    describe('#getById', () => {
        let sandbox: sinon.SinonSandbox;

        let findStub: sinon.sinonStub;

        let id: number;

        let findStubResult: User;
        let actualUserInfo: User;

        before(() => {

            id = faker.random.number();
            sandbox = sinon.createSandbox();
            findStub = sandbox.stub(UserRepository, 'findById');


        });

        after(() => {
            sandbox.restore();
        });

        context('when user exsists in DB', () => {
            before(async () => {
                findStubResult = {
                    id,
                    firstName: faker.random.word(),
                    lastName: faker.random.word(),
                    age: faker.random.number(),
                    email: faker.random.word()
                };

                findStub.resolves(findStubResult);

                actualUserInfo = await (new UserHandler).getById(id);
            });

            after(() => {
                sandbox.reset();
            });
            it('should call findById once', () => {
                assert.isTrue(findStub.calledOnce);
            });

            it('should call getById with expected arguments', () => {
                sinon.assert.calledWithExactly(findStub, id);
            });

            it('should return from getById expected result', () => {
                assert.deepEqual(actualUserInfo, findStubResult);
            });
        });


        context('when user doesnt exist in DB', () => {
            let actualResult;


            before(async () => {
                try {
                    await (new UserHandler()).getById(id);
                } catch (error) {
                    actualResult = error;
                }
            });

            after(() => {
                sandbox.reset();
            });

            it('should throw expected exception', () => {
                assert.instanceOf(actualResult, NotFound);
            });

        });


    });

    describe('#create', () => {
        let sandbox: sinon.SinonSandbox;
        let createUserStub: sinon.sinonStub;
        let createUserResult;
        let data;
        let result;
        let findByEmailStub;
        let email;

        before(() => {
            sandbox = sinon.createSandbox();
            createUserStub = sandbox.stub(UserRepository, 'createUser');
            findByEmailStub = sandbox.stub(UserRepository, 'findByEmail');

        });

        after(() => {
            sandbox.restore();
        });

        context('when user with email doest not exist', () => {
            before(async () => {
                createUserResult = faker.random.uuid();

                createUserStub.resolves(createUserResult);

                data = { id: faker.random.number() }

                result = await new UserHandler().create(data);
                email = result.email;

            });
            after(() => {
                sandbox.reset();
            });

            it('should call findByEmail once', () => {
                assert.isTrue(findByEmailStub.calledOnce);
            });

            it('should call findByEmail with expected agruments', () => {
                sinon.assert.calledWithExactly(findByEmailStub, email);
            });

            it('should call create method once', () => {
                assert.isTrue(createUserStub.calledOnce);
            });

            it('should call create method with expected arguments', () => {
                sinon.assert.calledWithExactly(createUserStub, data);
            });

            it('should return expected result', () => {
                assert.strictEqual(result, createUserResult);
            });
        });

        context('when user with email exists', () => {
            // let actualResult;
            let data;

            before(async () => {
                data = {
                    firstName: faker.random.word(),
                    lastName: faker.random.word(),
                    age: faker.random.number(),
                    email: faker.random.word()
                };

                findByEmailStub.resolves({ id: faker.random.uuid() });

                try {
                    result = await new UserHandler().create(data);
                } catch (error) {
                    result = error;
                }

                // try {
                //     await (new UserHandler() as any).findByEmail(email);

                // } catch (error) {
                //     actualResult = error;
                // }

                // try - catch
                // call create method
            });

            after(() => {
                sandbox.reset();
            });

            it('should call findByEmail once', () => {
                assert.isTrue(findByEmailStub.calledOnce);
            });

            it('should call findByEmail with expected arguments', () => {
                sinon.assert.calledWithExactly(findByEmailStub, data.email);
            });

            it('should not call create method', () => {
                assert.isTrue(createUserStub.notCalled);
            });

            it('should throw expected exception', () => {
                assert.instanceOf(result, BadRequest);
            });
        })
    });
});

