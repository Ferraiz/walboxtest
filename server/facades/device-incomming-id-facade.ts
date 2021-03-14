import { ServerError } from '../utils';
import { typeErrors } from '../constants';

class DeviceIncommingIdValidator {
  public validateIdUrl(url: string): string {
    const pathArray = url.split('/').filter((el) => el);

    if (pathArray.length !== 2) {
      throw new ServerError(typeErrors.VALIDATION_DEVICE_ID, 'Url does not have the right format');
    }

    return pathArray[1];
  }
}

export const deviceIncommingIdFacade = new DeviceIncommingIdValidator();