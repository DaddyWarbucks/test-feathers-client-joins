const assert = require('assert');
const app = require('../../../src/app');

describe('\'api/tags\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/tags');

    assert.ok(service, 'Registered the service');
  });
});
