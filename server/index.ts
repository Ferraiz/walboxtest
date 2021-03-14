import { Server } from 'ws';
import { chargerController, deviceController } from './controllers';

const portForCharger = Number(process.env.WS_PORT_CHARGER || 3100);
const portForDevice = Number(process.env.WS_PORT_DEVICE || 3200);

const wssCharger = new Server({ port: portForCharger });
const wssDevice = new Server({ port: portForDevice });

console.log('--- Starting websocket server');
wssCharger.on('connection', function connectionCharger(ws, req) {
  console.log(`--- Get connection from with chargers ${req.url}`);
  ws.on('message', function incomming(message) {
    chargerController.wsIncommingMessage(message as string, req.url || '');
  });
});

wssDevice.on('connection', function connectionDevice(ws, req) {
  console.log(`-- Get connection from devices ${req.url}`);
  const chargerPipe = deviceController.setChargerConnection(req.url || '');
  chargerPipe?.subscribe(
    (message:string) => {
      ws.send(message, (err) => {
        if (err) {
          console.error(`Error sending message to ${req.url}: `,err);
        }
        console.log(`-- Message sent to ${req.url}`);
      });
    },
    (err) => { console.error(`Error web socket ${req.url}: `, err); },
    () => {
      console.log(`Closing connection with ${req.url}`);
      ws.terminate();
    }
  );

  ws.on('close', function closeConnection() {
    console.log(`Connection with ${req.url} closed`);
  });

  ws.on('error', function errorWS (err) {
    console.error(`Websocket error: `, err);
    deviceController.closeChargerConnection(req.url || '');
  });
});
