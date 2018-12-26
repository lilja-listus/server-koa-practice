import * as sinon from 'sinon';
import * as faker from 'faker';
import { UserHandler } from 'api/src/controllers/user/handler'
import { User } from 'common/database/models/user-model';
import { UserRepository } from 'common/database/repositories';
import { assert } from 'chai';

describe('User controller unit tests', () => {
    describe('#getById', () => {
        let sandbox: sinon.SinonSandbox;

        let findStub: sinon.sinonStub;

        let id: number;

        let expectedUserInfo: User;
        let actualUserInfo: User;

        before(async () => {

            id = faker.random.number();
            sandbox = sinon.createSandbox();
            findStub = sandbox.stub(UserRepository, 'findById');


            expectedUserInfo = {
                id, 
                firstName: faker.random.word(),
                lastName: faker.random.word(),
                age: faker.random.number()
            };

            findStub.resolves(expectedUserInfo);

            actualUserInfo = await (new UserHandler).getById(id);
        });

        after(() => {
            sandbox.restore();
        });

        it('should call findById once', () => {
            assert.isTrue(findStub.calledOnce);
        });

        it('should call getById with expected arguments', () => {
             sinon.assert.calledWithExactly(findStub, id);
        });

        it('should return from getById expected result', () => {
            assert.deepEqual(actualUserInfo, expectedUserInfo);
         });
    });
});