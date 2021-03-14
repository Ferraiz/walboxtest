import { Observable } from 'rxjs';

import { websocketDatasource } from '../datasources';
import { chargeState } from '../constants';

class DeviceRepository {

  public getRepositoryConnection(deviceId: string): Observable<string> {
    return websocketDatasource.createConnection(deviceId);
  }

  public sendMessageDevice(deviceId: string, message: WsOutputMessage) {
    websocketDatasource.sendMessage(deviceId, JSON.stringify(message));

    if (message.data.status === chargeState.CHARGED) {
      websocketDatasource.closeConnection(deviceId);
    }
  }

  public removeDeviceConnection(deviceId: string) {
    websocketDatasource.closeConnection(deviceId);
  }
}

export const deviceRepository = new DeviceRepository();