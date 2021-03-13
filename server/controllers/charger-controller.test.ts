import { chargerController } from './charger-controller';
import { validationChargerIdError, validationInputError } from '../test-utils';

describe('Test for charger-controller', () => {
  let spy:any;

  beforeEach(() => {
    spy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    spy.mockRestore();
  });

  test(`
    If the validation of the incomming message fails an exception
    with a VALIDATION_INPUT error should be throw
  `, () => {
    const expected = expect.stringMatching(validationInputError);
    const message = JSON.stringify(
      {
        event: 'test',
        data: {
          soc: 10
        }
      }
    );
    
    chargerController.wsIncommingMessage(message,'/test/controller');
    const errorMsg = spy.mock.calls[0][0];

    expect(errorMsg).toEqual(expected);
  });

  test(`
  If the validation of the id charger fails an exception with  a VALIDATION_CHARGER_ID
  error should be throw
  `, () => {
    const expected = expect.stringMatching(validationChargerIdError);
    const message = JSON.stringify({
      event: 'StateOfCharge',
      data: {
        soc: 10
      }
    });

    chargerController.wsIncommingMessage(message, '/test/more/controller');
    const errorMsg = spy.mock.calls[0][0];

    expect(errorMsg).toEqual(expected);
  });
});