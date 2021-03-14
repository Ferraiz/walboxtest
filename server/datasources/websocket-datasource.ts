import WebSocket from 'ws';
import { BehaviorSubject, Observable } from 'rxjs';
import { websocketMachineState } from '../constants';

export class WebsocketDatasource {

  private ws: WebSocket;

  private websocketState: BehaviorSubject<WsState> = new BehaviorSubject<WsState>({ state: websocketMachineState.DISCONNECTED });

  get stateObservable(): Observable<WsState> {
    return this.websocketState.asObservable();
  }

  constructor(url: string) {
    const self = this;
    this.ws = new WebSocket(url);
    this.ws.on('open', function open(err: Error) {
      if (err) {
        self.websocketState.next({
          state: websocketMachineState.ERROR_CONNECTING,
          payload: {
            error: err
          }
        })
      } else {
        self.websocketState.next({
          state: websocketMachineState.CONNECTED
        })
      }
    });

    this.ws.on('error', function setError (err){
      self.websocketState.next({
        state: websocketMachineState.ERROR_SENDING_MESSAGE,
        payload: {
          error: err
        }
      });
    });

    this.ws.on('close', function closeState () {
      self.websocketState.next({ state: websocketMachineState.DISCONNECTED });
    });
  }

  public terminateConnection () {
    this.ws.terminate();
    this.websocketState.complete();
  }

  public sendMessage(message: string) {
    const self = this;
    const currentState = this.websocketState.value;

    if (currentState.state !== websocketMachineState.DISCONNECTED && currentState.state !== websocketMachineState.SENDING_MESSAGE) {
      this.websocketState.next({
        state: websocketMachineState.SENDING_MESSAGE,
        payload: {
          message: message
        }
      });
      
      this.ws.send(message, function sendMessage(err) {
        if (err) {
          self.websocketState.next({
            state: websocketMachineState.ERROR_SENDING_MESSAGE,
            payload: {
              error: err
            }
          });
        } else {
          self.websocketState.next({
            state: websocketMachineState.MESSAGE_SENT,
            payload: {
              message,
            }
          });
        }
      });
    }
  }
}