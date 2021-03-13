import { chargerIncommingFacade } from './charger-incomming-id-facade';

describe(`Test for chargerIncommingFacade`, () => {
  test(`
    If the url doesn't have the right format we can not be sure
    about which position is the charger id so, in that case, the
    facade throw an exception
  `, (done) => {
    const url = '/path/got/in/incomming/message'
    const expected = expect.stringMatching(/^\[VALIDATION_CHARGER_ID\]##[0-9]{4}-[0-9]{1,2}-[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}::[0-9]{1,4}## Charger id can not be found -- .*: .*$/gs);

    try {
      chargerIncommingFacade.validateIdUrl(url);
      done.fail('It should fail');
    } catch (err) {
      expect(err.customMessage).toEqual(expected);
      done();
    }
  })

  test(`
    If the url have the right format we can retrive the charger id
  `, () => {
    const chargerId='testId001';
    const url = `/chargers/${chargerId}`;

    const result = chargerIncommingFacade.validateIdUrl(url);
    expect(result).toBe(chargerId);
  });
});