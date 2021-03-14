import { Subject, Observable } from 'rxjs';
import { typeErrors } from '../constants';
import { ServerError } from '../utils';

class WebsocketDatasource {

  private connections: {[deviceId: string]: Subject<string>} = {};

  public createConnection(deviceId: string): Observable<string> {
    if (!this.connections[deviceId]) {
      this.connections[deviceId] = new Subject<string>();
    }

    return this.connections[deviceId].asObservable();
  }

  public sendMessage(deviceId: string, message:string) {
    if(!this.connections[deviceId]) {
      throw new ServerError(typeErrors.WEBSOCKET_ERROR, `There is not a connection created for the device ${deviceId}`);
    }

    this.connections[deviceId].next(message);
  }

  public closeConnection (deviceId: string) {
    if (this.connections[deviceId]) {
      this.connections[deviceId].complete();
      delete this.connections[deviceId];
    }
  }
}

export const websocketDatasource = new WebsocketDatasource();