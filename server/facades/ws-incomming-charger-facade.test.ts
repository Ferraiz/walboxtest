import { wsIncommingFacade } from './ws-incomming-charger-facade';

describe('Test for wsIncommingFacade', () => {
  test(`
    The input does not have the expecte schema and the facade validator throw an error
  `, (done) => {
    const message = JSON.stringify(
      {
        event: 'test',
        data: {
          soc: 10
        }
      }
    );
    const expected = expect.stringMatching(/^\[VALIDATION_INPUT\]##[0-9]{4}-[0-9]{1,2}-[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}::[0-9]{1,4}## Ivalid input object -- .*: .*$/gs);

    try {
      wsIncommingFacade.validateSchema(message);
      done.fail('It should fail');
    } catch (err) {
      expect(err.customMessage).toEqual(expected);
      done();
    }
  });

  test(`
    As result of the validation we should get a WsIncommingCharger object
  `, () => {
    const incommingMessage = {
      event: 'StateOfCharge',
      data: {
        soc: 10
      }
    }
    const message = JSON.stringify(incommingMessage);
    const result = wsIncommingFacade.validateSchema(message);
    expect(result).toEqual(incommingMessage);
  });
});