import { validateChargeValue } from '../test-utils';
import { wsOutputDeviceFacade } from './ws-output-device-facade';
import { chargeState, WEBSOCKET_EVENT_OUTPUT} from '../constants';

describe('Unit test for wsOutputDeviceFacade', () => {

  test(`
    If the charge value is less than 0 a VALIDATION_CHARGE_VALUE error will be throw
  `, (done) => {
    const expected = expect.stringMatching(validateChargeValue);
    try {
      wsOutputDeviceFacade.chargeValueValidator(-5);
      done.fail('It should fail');
    } catch (err) {
      expect(err.customMessage).toEqual(expected);
      done();
    }
  });

  test(`
    If the charge value is bigger than 100 a VALIDATION_CHARGE_VALUE error will be throw
  `, (done) => {
    const expected = expect.stringMatching(validateChargeValue);
    try {
      wsOutputDeviceFacade.chargeValueValidator(101);
      done.fail('It should fail');
    } catch (err) {
      expect(err.customMessage).toEqual(expected);
      done();
    }
  });

  test(`
    If the charge value is less than 80 the status of the response will be CHARGING
  `, () => {
    const expected = {
      event: WEBSOCKET_EVENT_OUTPUT,
      data: {
        status: chargeState.CHARGING
      }
    };

    const result = wsOutputDeviceFacade.chargeValueValidator(20);
    expect(result).toEqual(expected);
  });

  test(`
    If the charge value is bigger than 80 but less than 100 the response will be CHARGING80
  `, () => {
    const expected = {
      event: WEBSOCKET_EVENT_OUTPUT,
      data: {
        status: chargeState.CHARGING80
      }
    };

    const result = wsOutputDeviceFacade.chargeValueValidator(90);
    expect(result).toEqual(expected);
  });

  test(`
    If the charge value is equal to 100 the respose will be CHARGED
  `, () => {

    const expected = {
      event: WEBSOCKET_EVENT_OUTPUT,
      data: {
        status: chargeState.CHARGED
      }
    };

    const result = wsOutputDeviceFacade.chargeValueValidator(100);
    expect(result).toEqual(expected);
  });
});