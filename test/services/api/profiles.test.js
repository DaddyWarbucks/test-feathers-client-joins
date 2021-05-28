const assert = require('assert');
const app = require('../../../src/app');

describe("'api/profiles' service", () => {
  it('registered the service', () => {
    const service = app.service('api/profiles');

    assert.ok(service, 'Registered the service');
  });
});
