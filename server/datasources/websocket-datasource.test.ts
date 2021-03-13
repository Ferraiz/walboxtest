import WS from 'jest-websocket-mock';
import { EventEmitter } from 'events';
import { WebsocketDatasource } from './websocket-datasource';
import { mockWebSocket } from '../test-utils';
import WebSocket from 'ws';
jest.mock('ws');

describe.skip('Test websocket datasource', () => {
  test(`
    The method sendMessage should send a message to the server and close connection
    if the terminate flat is true
  `, (done) => {
    debugger;
    const url = 'http://localhost:12345';
    const message = 'Test message'
    const websocketDatasource = new WebsocketDatasource(url);

    mockWebSocket.on('checkMessage', (check) => {
      expect(check).toBe(true);
    });

    mockWebSocket.on('terminateConnection', () => {
      done();
    });

    expect(mockWebSocket.checkUrl(url)).toBe(true);
    websocketDatasource.sendMessage(message);
    mockWebSocket.fireOpen(message);
  });
})