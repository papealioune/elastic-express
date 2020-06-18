import uuid from 'uuid/v4';
import Invoke from './Invoke-func';

jest.mock('./Invoke-func');

beforeEach(() => {
    Invoke.mockClear();
});

it('Should be unique', () => {
    const uniqueId = new Invoke();
    expect(uniqueId).to
})