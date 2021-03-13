import { chargerRepository } from './charger-repository';
import { readingDocumentError, deviceIdForChargerNotFoundError } from '../test-utils';
import util from 'util';
import { join } from 'path';
import { config } from '../config';
jest.mock('util', () => ({
  promisify: jest.fn()
}));
jest.mock('../config', () => ({
  config: {
    database: {
      jsonPath: '/test/document/path'
    }
  }
}));

describe('Test for chargerRepository', () => {
  describe('Test for method getDeviceId', () => {
    test(`
    If the information can not be read a ERROR_READING_DOCUMENT exception should be throw
    `, async (done) => {
      const expected = expect.stringMatching(readingDocumentError);
      const chargerId = 'testId';
      (util.promisify as any).mockReturnValueOnce((path:string, charset:string) => {
        try {
          expect(path).toBe(join(process.cwd(), '/test/document/path'));
          expect(charset).toBe('utf8');
        } catch (err) {
          done.fail('It should not fail');
        }
        return Promise.reject(new Error('test error'));
      });

      try {
        await chargerRepository.getDeviceId(chargerId);
        done.fail('It should fail');
      } catch (err) {
        expect(err.customMessage).toEqual(expected);
        done();
      }
    });

    test(`
    If the deviceId associated to the charger is not found a DEVICE_ID_NOT_FOUND error
    will be throw
    `, async (done) => {
      const expected = expect.stringMatching(deviceIdForChargerNotFoundError);
      const chargerId = 'testId';
      (util.promisify as any).mockReturnValueOnce((path: string, charset: string) => {
        try {
          expect(path).toBe(join(process.cwd(), '/test/document/path'));
          expect(charset).toBe('utf8');
        } catch(err) {
          done.fail('It should not fail');
        }

        return Promise.resolve(JSON.stringify({ 'otherId': 'value' }));
      });

      try {
        await chargerRepository.getDeviceId(chargerId);
        done.fail('It should fail');
      } catch (err) {
        expect(err.customMessage).toEqual(expected);
        done();
      }
    });

    test(`
      If the chargerId match with a deviceId in the JSON document, the deviceId value
      will be returned
    `, async (done) => {
      const chargerId = 'testId';
      const jsonDocument = {[chargerId]: 'deviceId value'};
      (util.promisify as any).mockReturnValueOnce((path: string, charset: string) => {
        try {
          expect(path).toBe(join(process.cwd(), '/test/document/path'));
          expect(charset).toBe('utf8');
        } catch (err) {
          done.fail('It should not fail');
        }

        return Promise.resolve(JSON.stringify(jsonDocument));
      });

      const result = await chargerRepository.getDeviceId(chargerId);
      expect(result).toBe(jsonDocument[chargerId]);
      done();
    });
  });
});