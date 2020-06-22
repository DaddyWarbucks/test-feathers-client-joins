// Initializes the `api/batch` service on path `/api/batch`
const { Batch } = require('./batch.class');
const hooks = require('./batch.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/batch', new Batch(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/batch');

  service.hooks(hooks);
};
