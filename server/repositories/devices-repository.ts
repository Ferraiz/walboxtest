import { Subscription } from 'rxjs';

import { config } from '../config';
import { WebsocketDatasource } from '../datasources';
import { websocketMachineState, typeErrors, chargeState } from '../constants';
import { ServerError } from '../utils';

class DeviceRepository {

  private devicesOnline: { [deviceId: string]: WebsocketDatasource } = {};
  private devicesSubscription: { [deviceId: string]: Subscription } = {};

  public sendChargerState(message: WsOutputMessage, deviceId: string): Promise<string> {
    return new Promise((resolve, reject) => {
        let tries = 0;
        if (!this.devicesOnline[deviceId]) {
          this.devicesOnline[deviceId] = new WebsocketDatasource(config.device.baseUrl + deviceId);
        }

        if (this.devicesSubscription[deviceId]) {
          this.devicesSubscription[deviceId].unsubscribe();
          delete this.devicesSubscription[deviceId];
        }

        this.devicesSubscription[deviceId] = this.devicesOnline[deviceId].stateObservable.subscribe((wsState: WsState) => {
          let error: ServerError;

          switch(wsState.state) {
            case websocketMachineState.ERROR_CONNECTING:
              error = new ServerError(typeErrors.WEBSOCKET_ERROR, `[${deviceId}] Error trying to connect to device websocket`);
              this.devicesOnline[deviceId].terminateConnection();
              reject(error);
            break;
            case websocketMachineState.SENDING_MESSAGE:
              console.log(`[${deviceId}] Sending message to websocket: ${JSON.stringify(wsState.payload || {})}`);
            break;
            case websocketMachineState.MESSAGE_SENT:
              console.log(`[${deviceId}] Message sent to webSocket: ${JSON.stringify(wsState.payload)}`);
              const wsMessage: WsOutputMessage = JSON.parse((wsState.payload) ? wsState.payload.message : {});
              if (wsMessage.data && wsMessage.data.status === chargeState.CHARGED) {
                this.devicesOnline[deviceId].terminateConnection();
              }
              resolve((wsMessage.data) ? wsMessage.data.status: '');
            break;
            case websocketMachineState.ERROR_SENDING_MESSAGE:
              console.error(`[${deviceId}] Error sending message to device: ${JSON.stringify(wsState.payload || {})}`);
              if (config.device.maxTries > ++tries) {
                this.devicesOnline[deviceId].sendMessage(JSON.stringify(message));
              } else {
                error = new ServerError(typeErrors.MESSAGE_NOT_SENT, `[${deviceId}] Max retries has been reached: ${JSON.stringify(wsState.payload || {})}`);
                this.devicesOnline[deviceId].terminateConnection();
                reject(error);
              }
            break;
            case websocketMachineState.DISCONNECTED:
              console.log(`[${deviceId}] Close connection with websocket device`);
            break;
            default:
              console.log(`[${deviceId}] Connection with websocket device alive`);
              this.devicesOnline[deviceId].sendMessage(JSON.stringify(message));
          }
        });
    });
  }

  public termianteDeviceConnection(deviceId: string) {
    if (this.devicesSubscription[deviceId]) {
      this.devicesSubscription[deviceId].unsubscribe();
      delete this.devicesSubscription[deviceId];
    }

    if (this.devicesOnline[deviceId]) {
      delete this.devicesOnline[deviceId];
    }
  }
}

export const devicesRepository = new DeviceRepository();