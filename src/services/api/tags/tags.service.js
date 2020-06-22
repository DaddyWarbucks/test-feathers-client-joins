// Initializes the `api/tags` service on path `/api/tags`
const { Tags } = require('./tags.class');
const createModel = require('../../../models/tags.model');
const hooks = require('./tags.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  };

  // Initialize our service with any options it requires
  app.use('/api/tags', new Tags(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/tags');

  service.hooks(hooks);
};
