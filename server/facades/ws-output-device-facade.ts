import { chargeState, WEBSOCKET_EVENT_OUTPUT, typeErrors } from '../constants';
import { ServerError } from '../utils';

class WsOutputDeviceValidator {

  public chargeValueValidator(chargeValue: number): WsOutputMessage {
    if (chargeValue < 0 || chargeValue > 100) {
      throw new ServerError(typeErrors.VALIDATION_CHARGE_VALUE, 'The charge value can not be less than 0 or bigger than 100');
    }

    return {
      event: WEBSOCKET_EVENT_OUTPUT,
      data: {
        status: (chargeValue < 80) ? chargeState.CHARGING : (chargeValue === 100) ? chargeState.CHARGED : chargeState.CHARGING80
      }
    }
  }
}

export const wsOutputDeviceFacade = new WsOutputDeviceValidator();