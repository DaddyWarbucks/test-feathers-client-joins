const assert = require('assert');
const app = require('../../../src/app');

describe("'api/batch' service", () => {
  it('registered the service', () => {
    const service = app.service('api/batch');

    assert.ok(service, 'Registered the service');
  });
});
