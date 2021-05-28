// Initializes the `api/comments` service on path `/api/comments`
const { Comments } = require('./comments.class');
const createModel = require('../../../models/comments.model');
const hooks = require('./comments.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  };

  // Initialize our service with any options it requires
  app.use('/api/comments', new Comments(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/comments');

  service.hooks(hooks);
};
