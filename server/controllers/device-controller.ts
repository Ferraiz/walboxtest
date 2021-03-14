import { Observable } from 'rxjs';

import { deviceIncommingIdFacade } from '../facades';
import { deviceRepository } from '../repositories';

class DeviceController {
  public setChargerConnection(url: string): Observable<string> | undefined {
    let result = undefined;
    try {
      const deviceId = deviceIncommingIdFacade.validateIdUrl(url);
      result = deviceRepository.getRepositoryConnection(deviceId);
    } catch(err) {
      console.error(err.customMessage || err.message);
    }

    return result;
  }

  public closeChargerConnection(url: string) {
    try {
      const deviceId = deviceIncommingIdFacade.validateIdUrl(url);
      deviceRepository.removeDeviceConnection(deviceId);
    } catch(err) {
      console.error(err.customMessage || err.message);
    }
  }
}

export const deviceController = new DeviceController();