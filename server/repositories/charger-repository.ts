import { config } from '../config';
import { jsonDocumentDatasource } from '../datasources';
import { typeErrors } from '../constants';
import { ServerError } from '../utils';

class ChargerRepository {
  public async getDeviceId(chargerId: string): Promise<string> {
    const deviceId =  await jsonDocumentDatasource.find(config.database.jsonPath, chargerId);

    if (!deviceId) {
      throw new ServerError(typeErrors.DEVICE_ID_NOT_FOUND, `Device id query returned ${deviceId}`);
    }

    return deviceId;
  }
}

export const chargerRepository = new ChargerRepository();