export enum typeErrors {
  VALIDATION_INPUT = 'VALIDATION_INPUT',
  VALIDATION_CHARGER_ID ='VALIDATION_CHARGER_ID',
  ERROR_READING_DOCUMENT = 'ERROR_READING_DOCUMENT',
  DEVICE_ID_NOT_FOUND = 'DEVICE_ID_NOT_FOUND',
  MESSAGE_NOT_SENT = 'MESSAGE_NOT_SENT',
  WEBSOCKET_ERROR = 'WEBSOCKET_ERROR',
  VALIDATION_CHARGE_VALUE = 'VALIDATION_CHARGE_VALUE',
  VALIDATION_DEVICE_ID = 'VALIDATION_DEVICE_ID'
}

export const errorMessage = {
  [typeErrors.VALIDATION_INPUT]: 'Ivalid input object',
  [typeErrors.VALIDATION_CHARGER_ID]: 'Charger id can not be found',
  [typeErrors.ERROR_READING_DOCUMENT]: 'Data document can not be read',
  [typeErrors.DEVICE_ID_NOT_FOUND]: 'Device associated to charger not found',
  [typeErrors.MESSAGE_NOT_SENT]: 'Error sending the message',
  [typeErrors.WEBSOCKET_ERROR]: 'Error connecting with the device',
  [typeErrors.VALIDATION_CHARGE_VALUE]: 'Invalid charge value',
  [typeErrors.VALIDATION_DEVICE_ID]: 'Device id can not be found',
}