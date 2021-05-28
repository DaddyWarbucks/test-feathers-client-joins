const assert = require('assert');
const app = require('../../../src/app');

describe("'api/categories' service", () => {
  it('registered the service', () => {
    const service = app.service('api/categories');

    assert.ok(service, 'Registered the service');
  });
});
