import { jsonDocumentDatasource } from './json-document-datasource';
import { readingDocumentError } from '../test-utils';
import util from 'util';
jest.mock('util', () => {
  return {
    promisify: jest.fn(),
  }
});

describe('Unit test for jsonDocumentDatasource', () => {
  describe('Test for method find', () => {
    test(`
      If we can not read the document an ERROR_READING_DOCUMENT exception should be
      throw
    `, async (done) => {
      const expected = expect.stringMatching(readingDocumentError);
      (util.promisify as any).mockReturnValueOnce(() => {
        throw new Error('Test error');
      });

      try {
        await jsonDocumentDatasource.find('/document/path', 'key');
        done.fail('It should fail');
      } catch (err) {
        expect(err.customMessage).toEqual(expected);
        done();
      }
    });

    test(`
      If the filter don't match with any entry in the document the find method should
      return undefined
    `, async () => {
      (util.promisify as any).mockReturnValueOnce(() => {
        return Promise.resolve(JSON.stringify({ 'otherKey': 'value' }));
      });

      const result = await jsonDocumentDatasource.find('/document/path', 'key');
      expect(result).toBeUndefined();
    });

    test(`
      If the filter match with an entry in the docuemnt the find method should return the
      content of the document
    `, async () => {
      (util.promisify as any).mockReturnValueOnce(() => {
        return Promise.resolve(JSON.stringify({
          'key': 'key value',
          'otherKey': 'other value'
        }));
      });

      const result = await jsonDocumentDatasource.find('/document/path', 'key');
      expect(result).toBe('key value');
    });
  });
});

