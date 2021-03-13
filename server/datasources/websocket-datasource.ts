import WebSocket from 'ws';
import { typeErrors } from '../constants';
import { ServerError } from '../utils';

export class WebsocketDatasource {

  private ws: WebSocket;

  constructor(url: string) {
    this.ws = new WebSocket(url);
  }

  private terminateConnection () {
    this.ws.terminate();
  }

  public sendMessage(message: string, terminate = false) {
    debugger;
    const self = this;

    this.ws.on('open', function open() {
      self.ws.send(message, (err) => {
        if (err) {
          throw new ServerError(typeErrors.MESSAGE_NOT_SENT, err.message);
        }

        if (terminate) {
          self.terminateConnection();
        }
      });
    });

    this.ws.on('error', function error(err) {
      throw new ServerError(typeErrors.WEBSOCKET_ERROR, err.message);
    });
  }
}