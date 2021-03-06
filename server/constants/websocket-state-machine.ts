export enum websocketMachineState {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTED = 'CONNECTED',
  SENDING_MESSAGE = 'SENDING_MESSAGE',
  ERROR_SENDING_MESSAGE = 'SENDING_MESSAGE',
  ERROR_CONNECTING = 'SENDING_MESSAGE',
  MESSAGE_SENT = 'MESSAGE_SENT'
};

export enum chargeState {
  CHARGING = 'charging',
  CHARGING80 = 'charging80',
  CHARGED = 'charged'
}

export const WEBSOCKET_EVENT_OUTPUT = 'chargingStatus';