// Initializes the `api/categories` service on path `/api/categories`
const { Categories } = require('./categories.class');
const createModel = require('../../../models/categories.model');
const hooks = require('./categories.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  };

  // Initialize our service with any options it requires
  app.use('/api/categories', new Categories(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/categories');

  service.hooks(hooks);
};
