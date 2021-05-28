const assert = require('assert');
const app = require('../../../src/app');

describe("'api/bios' service", () => {
  it('registered the service', () => {
    const service = app.service('api/bios');

    assert.ok(service, 'Registered the service');
  });
});
