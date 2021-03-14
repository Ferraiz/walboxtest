import { deviceRepository } from './device-repository';

describe('Test for deviceRepository', () => {

  describe('Test for getRepositoryConnection', () => {
    test(`
      getRepositoryConnection should return an observable to manage the
      messages for a device
    `, (done) => {
      const deviceID = 'test01';
      const chargeMessage = {
        event: 'chargingStatus',
        data: {
          status: 'charging',
        },
      }

      deviceRepository.getRepositoryConnection(deviceID).subscribe(
        (msg) => {
          expect(JSON.parse(msg)).toEqual(chargeMessage);
          done();
        },
        () => { done.fail('It should not fail'); }
      );

      deviceRepository.sendMessageDevice(deviceID, chargeMessage);
    });
  });

  describe('Test for sendMessageDevice', () => {
    test(`
      The message sent through the methos sendMessageDevice will be took by
      the observable connection
    `, (done) => {
      const deviceId = 'test02';
      const chargeMessage = {
        event: 'chargingStatus',
        data: {
          status: 'charging80',
        },
      };

      deviceRepository.getRepositoryConnection(deviceId).subscribe(
        (msg) => {
          expect(JSON.parse(msg)).toEqual(chargeMessage);
          done();
        },
        () => { done.fail('It should not fail'); }
      );

      deviceRepository.sendMessageDevice(deviceId, chargeMessage);
    });

    test(`
      If the value of the state is CHARGED, the connection with the device will be
      close
    `, (done) => {
      const deviceId = 'test03';
      const chargeMessage = {
        event: 'chargingStatus',
        data: {
          status: 'charged',
        },
      };

      deviceRepository.getRepositoryConnection(deviceId).subscribe(
        (msg) => {
          expect(JSON.parse(msg)).toEqual(chargeMessage);
        },
        () => { done.fail('It should not fail'); },
        () => { done(); }
      );

      deviceRepository.sendMessageDevice(deviceId, chargeMessage);
    });
  });

  describe('Test for removeDeviceConnection', () => {
    test(`
      The method removeDeviceConnection should close the 
      observable subscription
    `, (done) => {
      const deviceId = 'test04';

      deviceRepository.getRepositoryConnection(deviceId).subscribe(
        () => { done.fail('It shloudl not get any message'); },
        () => { done.fail('It should not fail'); },
        () => { done(); }
      );

      deviceRepository.removeDeviceConnection(deviceId);
    });
  });
});