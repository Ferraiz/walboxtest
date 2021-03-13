import { ServerError } from './server-type-error';
import { typeErrors } from '../constants';

describe(`Unit test for ServerError`, () => {
  test(`
    The ServerError message should have:
      1. The internal type of error
      2. The current date and time when the error happened
      3. The internal error message
      4. The original error message
      5. The JavaScript Stack
  `, () => {
    const message = 'This is a test message';
    const serverError = new ServerError(typeErrors.VALIDATION_INPUT, message);
    const expected = expect.stringMatching(/^\[VALIDATION_INPUT\]##[0-9]{4}-[0-9]{1,2}-[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}::[0-9]{1,4}## Ivalid input object -- .*: .*$/gs);

    expect(serverError.customMessage).toEqual(expected);
  });
});