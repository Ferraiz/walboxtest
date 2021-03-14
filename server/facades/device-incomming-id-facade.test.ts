import { deviceIncommingIdFacade } from './device-incomming-id-facade';
import { validateDeviceId } from '../test-utils';

describe('Test fro DeviceIncommingIdValidator', () => {
  test(`
    If the url does not have the right format a VALIDATION_DEVICE_ID error will
    be thrown
  `, (done) => {
    const expected = expect.stringMatching(validateDeviceId);
    try {
      deviceIncommingIdFacade.validateIdUrl('/wrong/path/length');
      done.fail('It should fail');
    } catch (err) {
      expect(err.customMessage).toEqual(expected);
      done();
    }
  });

  test(`
    If the url has the right format the deviceId will be returned
  `, () => {
    const deviceId = 'testId';
    const result = deviceIncommingIdFacade.validateIdUrl(`/path/${deviceId}`);
    expect(result).toBe(deviceId);
  });
});