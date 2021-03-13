import { Validator } from 'jsonschema';
import { wsIncommingChargerSchema } from '../schemas';
import { typeErrors } from '../constants';
import { ServerError } from '../utils';

class WsIncommingChargerValidator {

  private validator: Validator;

  constructor() {
    this.validator = new Validator();
    this.validator.addSchema(wsIncommingChargerSchema, '/IncommingChargerSchema');
  }

  public validateSchema(message: string): WsIncommingCharger {
    const incommingCharger = JSON.parse(message);
    const result = this.validator.validate(incommingCharger, wsIncommingChargerSchema);

    if (!result.valid) {
      throw new ServerError(typeErrors.VALIDATION_INPUT, `Input: ${message} is not valid`);
    }

    return incommingCharger;
  }
  
}

export const wsIncommingFacade = new WsIncommingChargerValidator();