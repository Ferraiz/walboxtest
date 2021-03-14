import { websocketDatasource } from './websocket-datasource';
import { deviceWebsocketError } from '../test-utils';

describe('Test websocketDataSource', () => {

  describe('Test createConnection', () => {
    test(`
      The method createConnection should return an observable for 
      the device connection
    `, (done) => {
      const deviceId = 'test01'
      const message = 'test'
      websocketDatasource.createConnection(deviceId)
      .subscribe(
        (result) => {
          expect(result).toBe(message);
          websocketDatasource.closeConnection(deviceId);
          done();
        },
        () => { done.fail('It should not fail')}
      );

      websocketDatasource.sendMessage(deviceId, message);
    });
  });

  describe(`Test send message`, () => {
    test(`
      The method sendMessage should send a messager for a device through the 
      observable
    `, (done) => {
      const deviceId = 'test02'
      const message = 'test'
      websocketDatasource.createConnection(deviceId)
      .subscribe(
        (result) => {
          expect(result).toBe(message);
          websocketDatasource.closeConnection(deviceId);
          done();
        },
        () => { done.fail('It should not fail')}
      );

      websocketDatasource.sendMessage(deviceId, message);
    });

    test(`
      If there is not connection created for the device a WEBSOCKET_ERROR will
      be thrown
    `, (done) => {
      const deviceId = 'test03';
      const expected = expect.stringMatching(deviceWebsocketError);

      try {
        websocketDatasource.sendMessage(deviceId, 'hello');
        done.fail('It should fail');
      } catch (err) {
        expect(err.customMessage).toEqual(expected);
        done();
      }
    });
  });

  describe('Test for closeConnection', () => {
    test(`
      CloseConnection will close the observable for the device
    `, (done) => {
      const deviceId = 'test04';
      websocketDatasource.createConnection(deviceId).subscribe(
        () => { done.fail('It should not get any message'); },
        () => { done.fail('It should not fail'); },
        () => { done(); }
      );

      websocketDatasource.closeConnection(deviceId);
    });
  });
});