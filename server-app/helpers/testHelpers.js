import sinon from 'sinon';
import User from '../models/UserModel';
import PackageItem from '../models/PackageItemModel';

export const stubDatabase = () => {
  const userStub = sinon.stub(User, 'findOne');
  const packageItemFindStub = sinon.stub(PackageItem, 'find').returns({
    sort: sinon.stub().resolves([]),
    exec: sinon.stub().resolves([]),
  });
  const packageItemFindByIdStub = sinon.stub(PackageItem, 'findById');

  return {
    userStub,
    packageItemFindStub,
    packageItemFindByIdStub,
  };
};

export const restoreDatabase = (stubs) => {
  stubs.userStub.restore();
  stubs.packageItemFindStub.restore();
  stubs.packageItemFindByIdStub.restore();
};