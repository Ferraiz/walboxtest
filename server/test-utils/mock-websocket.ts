import { EventEmitter } from 'events';

class MockWebsocket extends EventEmitter {
  private url: string = '';
  private error: string | undefined;
  private message: string | undefined;

  public checkUrl(url: string): boolean {
    return this.url === url;
  }

  public setUrl(url: string) {
    this.url = url;
  }
  
  public fireOpen(message: string, error?: string) {
    debugger;
    this.error = error;
    this.message = message;
    this.emit('open');
  }

  public send(message:string, callback: Function) {
    debugger;
    this.emit('checkMessage', message === this.message);
    callback(this.error);
  }

  public terminate() {
    this.emit('terminateConnection');
  }

  public fireError(error: Error) {
    this.emit('error', error);
  }
}

export const mockWebSocket = new MockWebsocket();