// Initializes the `api/batch` service on path `/api/batch`
const { BatchService } = require('feathers-batch');
const hooks = require('./batch.hooks');

module.exports = function (app) {
  // Initialize our service with any options it requires
  app.use('/api/batch', new BatchService(app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/batch');

  service.hooks(hooks);
};
