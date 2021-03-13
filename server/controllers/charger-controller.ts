import { chargerIncommingFacade, wsIncommingFacade} from '../facades';

class ChargerController {

  public wsIncommingMessage(message: string, url: string) {
    try {
      const incommingCharger: WsIncommingCharger = wsIncommingFacade.validateSchema(message);
      const idCharger:string = chargerIncommingFacade.validateIdUrl(url);

      console.log('NNN incommingCharger: ', incommingCharger);
      console.log('NNN idCharger: ', idCharger);
    } catch(err) {
      console.error(err.customMessage);
    }
  }
}

export const chargerController = new ChargerController();