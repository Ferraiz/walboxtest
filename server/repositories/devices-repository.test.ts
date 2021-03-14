import { BehaviorSubject } from 'rxjs';

import { websocketMachineState } from '../constants';
import { deviceWebsocketError } from '../test-utils';
import { devicesRepository } from './devices-repository';
import { WebsocketDatasource } from '../datasources/websocket-datasource';
// jest.mock('../datasources/websocket-datasource', () => {
//   return jest.fn().mockImplementation(() => {
//     const mockSubject = new BehaviorSubject<WsState>({ state: websocketMachineState.DISCONNECTED })
//     return {
//       ws: jest.fn(),
//       websocketState: mockSubject,
//       stateObservable: mockSubject.asObservable(),
//       terminateConnection: jest.fn(),
//       sendMessage: jest.fn(),
//     }
//   });
// });

describe.skip ('Test for devices repository', () => {
  let spyConsoleError: any;
  let spyConsoleLog: any;

  beforeEach(() => {
    spyConsoleError = jest.spyOn(console, 'error').mockImplementation();
    spyConsoleLog = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    spyConsoleLog.mockRestore();
    spyConsoleError.mockRestore();
  });

  describe('Test for sendChargerState', () => {
    test(`
      If the websocket send a ERROR_CONNECTING event a WEBSOCKET_ERROR should be
      throw
    `, (done) => {
      debugger;
      const expected = expect.stringMatching(deviceWebsocketError);
      const deviceId = 'test01';
      const message = {
        event: 'StateOfCharge',
        data: {
          status: 'charging'
        }
      };

      devicesRepository.sendChargerState(message, deviceId)
        .then(() => { done.fail('It should fail'); })
        .catch((error) => {
          expect(error.customMessage).toEqual(expected);
          done();
        });

      console.log('NNN sorce: ', WebsocketDatasource);
    })
  });
});