import { chargerIncommingFacade, wsIncommingFacade, wsOutputDeviceFacade } from '../facades';
import { chargerRepository, deviceRepository} from '../repositories';
class ChargerController {

  public async wsIncommingMessage(message: string, url: string) {
    try {
      const incommingCharger: WsIncommingCharger = wsIncommingFacade.validateSchema(message);
      const idCharger:string = chargerIncommingFacade.validateIdUrl(url);

      const deviceId = await chargerRepository.getDeviceId(idCharger);
      const outputMessage = wsOutputDeviceFacade.chargeValueValidator(incommingCharger.data.soc);

      deviceRepository.sendMessageDevice(deviceId, outputMessage);
    } catch(err) {
      console.error(err.customMessage || err.message);
    }
  }
}

export const chargerController = new ChargerController();