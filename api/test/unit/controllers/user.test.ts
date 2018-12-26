import * as sinon from 'sinon';
import * as faker from 'faker';
import { UserHandler } from 'api/src/controllers/user/handler'
import { User } from 'common/database/models/user-model';
import { UserRepository } from 'common/database/repositories';
import { assert } from 'chai';
import { NotFound } from 'api/src/helpers/response-errors';

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
                    age: faker.random.number()
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
});