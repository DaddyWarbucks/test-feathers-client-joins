// Initializes the `api/posts` service on path `/api/posts`
const { Posts } = require('./posts.class');
const createModel = require('../../../models/posts.model');
const hooks = require('./posts.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: false,
    multi: true
  };

  // Initialize our service with any options it requires
  app.use('/api/posts', new Posts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/posts');

  service.hooks(hooks);
};
