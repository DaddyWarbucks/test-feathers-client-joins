// Initializes the `api/bios` service on path `/api/bios`
const { Bios } = require('./bios.class');
const createModel = require('../../../models/bios.model');
const hooks = require('./bios.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  };

  // Initialize our service with any options it requires
  app.use('/api/bios', new Bios(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/bios');

  service.hooks(hooks);
};
