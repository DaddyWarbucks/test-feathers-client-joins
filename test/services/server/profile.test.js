const assert = require('assert');
const app = require('../../../src/app');

describe('\'server/profile\' service', () => {
  it('registered the service', () => {
    const service = app.service('server/profile');

    assert.ok(service, 'Registered the service');
  });
});
