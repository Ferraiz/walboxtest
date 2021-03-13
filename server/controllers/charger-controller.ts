import { chargerIncommingFacade, wsIncommingFacade} from '../facades';
import { chargerRepository } from '../repositories';

class ChargerController {

  public async wsIncommingMessage(message: string, url: string) {
    try {
      const incommingCharger: WsIncommingCharger = wsIncommingFacade.validateSchema(message);
      const idCharger:string = chargerIncommingFacade.validateIdUrl(url);

      console.log('NNN incommingCharger: ', incommingCharger);
      console.log('NNN idCharger: ', idCharger);

      const deviceId = await chargerRepository.getDeviceId(idCharger);
      console.log('NNN deviceId: ', deviceId);
    } catch(err) {
      console.error(err.customMessage);
    }
  }
}

export const chargerController = new ChargerController();